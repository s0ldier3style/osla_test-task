import { useRef, useState, type FC } from 'react';
import styles from './view-task.module.scss';
import type { TStatus } from '../../../../shared/types/status';
import type { TPriority } from '../../../../shared/types/priority';
import StatusLabel from '../../../../shared/ui/status/status';
import PriorityLabel from '../../../../shared/ui/priority/priority';
import Subtitle from '../../../../shared/ui/subtitle/subtitle';
import { getInitials } from '../../../../shared/utils/formatName';
import AttachButton from '../../../../shared/ui/attach-button/attach-button';
import CloseButton from '../../../../shared/ui/close-button/close-button';
import OptionsButton from '../../../../shared/ui/options-button/options-button';
import type { Comment } from '../../../../shared/types/commets';
import type { Attachment } from '../../../../shared/types/attachments';
import AttachmentItem from '../../../../shared/ui/attachments/attachments';
import ActionsButtons from '../../../../shared/ui/actions-buttons/action-buttons';
import TextInput from '../../../../shared/ui/input/text-input';
import sendIcon from '../../../../assets/icons/send-fill.svg';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  addAttachment,
  addComment,
  removeAttachment,
  updateTaskStatus,
} from '../../model/tasksSlice';
import type { Task } from '../../../../shared/types/task';

interface ViewTaskProps {
  title: string;
  description: string;
  status: TStatus;
  planDate: string;
  priority: TPriority;
  object: string;
  subject: string;
  assigne: string;
  controller: string;
  setPerson: string;
  reminder: string;
  repeat: string;
  onClose: () => void;
  comments: Comment[];
  attachments: Attachment[];
  taskId: number;
}

const ViewTask: FC<ViewTaskProps> = ({
  title,
  description,
  status,
  planDate,
  priority,
  object,
  subject,
  assigne,
  controller,
  setPerson,
  reminder,
  repeat,
  onClose,
  taskId,
}) => {
  const task = useAppSelector((state) =>
    state.tasks.tasks.find((t) => t.id === taskId),
  );
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<
    'details' | 'comms' | 'attachments'
  >('details');

  const [newComment, setNewComment] = useState('');

  const handleTabChange = (tab: 'details' | 'comms' | 'attachments') => {
    setActiveTab(tab);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim() || !task) return;
    dispatch(
      addComment({
        taskId: task.id,
        text: newComment,
        author: task.setPerson,
      }),
    );
    setNewComment('');
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && task) {
      dispatch(addAttachment({ taskId: task.id, file }));
    }
    e.target.value = '';
  };

  const handleRemoveAttachment = (attachmentId: number) => {
    if (task) {
      dispatch(removeAttachment({ taskId: task.id, attachmentId }));
    }
  };

  if (!task) return null;

  const handleStatusChange = (newStatus: Task['status']) => {
    dispatch(updateTaskStatus({ taskId, status: newStatus }));
  };

  return (
    <div className={styles.view_task}>
      <div className={styles.view_task_header}>
        <CloseButton onClick={onClose} />
        <h2 className={styles.view_task_header_title}>Просмотр задачи</h2>
        <OptionsButton />
      </div>

      <div className={styles.view_task_title}>
        <h3 className={styles.title}> {title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.view_task_meta}>
        <div className={styles.meta_status}>
          <Subtitle subtitle='Статус:' />
          <StatusLabel status={status} />
        </div>
        <div className={styles.meta_date}>
          <Subtitle subtitle='Крайний срок:' />

          <span className={`${status === 'expired' ? styles.expired : ''}`}>
            {planDate}
          </span>
        </div>
        <div className={styles.meta_priority}>
          <Subtitle subtitle='Приоритет:' />
          <PriorityLabel priority={priority} />
        </div>
      </div>

      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 'details' ? styles.active : ''}`}
          onClick={() => handleTabChange('details')}
        >
          Подробности
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'comms' ? styles.active : ''}`}
          onClick={() => handleTabChange('comms')}
        >
          Комментарии
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'attachments' ? styles.active : ''}`}
          onClick={() => handleTabChange('attachments')}
        >
          Вложения
        </div>
      </div>

      {activeTab === 'details' && (
        <div className={styles.details}>
          <div className={styles.title_and_item}>
            <Subtitle subtitle='Объект:' />
            <span>{object}</span>
          </div>

          <div className={styles.title_and_item}>
            <Subtitle subtitle='Раздел:' />
            <span>{subject}</span>
          </div>

          <div className={styles.persons_info}>
            <div className={styles.persons_row}>
              <Subtitle subtitle='Исполнитель:' />
              <div className={styles.person}>
                <span className={styles.person_initials}>
                  {getInitials(assigne)}
                </span>
                <span>{assigne}</span>
              </div>
            </div>

            <div className={styles.persons_row}>
              <Subtitle subtitle='Контроллер:' />
              <div className={styles.person}>
                <span className={styles.person_initials}>
                  {getInitials(controller)}
                </span>
                <span>{controller}</span>
              </div>
            </div>

            <div className={styles.persons_row}>
              <Subtitle subtitle='Постановщик:' />
              <div className={styles.person}>
                <span className={styles.person_initials}>
                  {getInitials(setPerson)}
                </span>
                <span>{setPerson}</span>
              </div>
            </div>
          </div>

          <div className={styles.remind_repeat}>
            <div className={styles.remind}>
              <Subtitle subtitle='Напоминание:' />
              <span>{reminder}</span>
            </div>
            <div className={styles.repeat}>
              <Subtitle subtitle='Повтор:' />
              <span>{repeat}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comms' && (
        <div className={styles.comments_tab}>
          {task.comments.length === 0 ? (
            <p className={styles.no_comments}>Комментариев к задаче нет</p>
          ) : (
            task.comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.comment_info}>
                  <span className={styles.commentAuthor}>{comment.author}</span>
                  <span className={styles.commentDate}>{comment.date}</span>
                </div>
                <p className={styles.comment_text}>{comment.text}</p>
              </div>
            ))
          )}
          <form className={styles.comments_form} onSubmit={handleSubmitComment}>
            <TextInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={'Новый комментарий'}
              name='comment'
            />
            <button
              type='submit'
              className={styles.comments_form_submit}
              disabled={!newComment.trim()}
            >
              <img src={sendIcon} alt='Отправить' />
            </button>
          </form>
        </div>
      )}

      {activeTab === 'attachments' && (
        <div className={styles.attachments_tab}>
          {task.attachments.length === 0 ? (
            ''
          ) : (
            <div className={styles.attachments_list}>
              {task.attachments.map((att) => (
                <AttachmentItem
                  key={att.id}
                  attachment={att}
                  onRemove={() => handleRemoveAttachment(att.id)}
                />
              ))}
            </div>
          )}
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <AttachButton onClick={handleAttachClick} />
        </div>
      )}

      <ActionsButtons
        status={status}
        onSendToReview={() => handleStatusChange('on_review')}
        onProgress={() => handleStatusChange('in_progress')}
        onComplete={() => handleStatusChange('completed')}
      />
    </div>
  );
};

export default ViewTask;
