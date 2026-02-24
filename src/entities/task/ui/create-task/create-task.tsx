import { type FC, useRef, useState } from 'react';
import PriorityPanel from './priority-panel/priority-panel';
import PriorityLabel from '../../../../shared/ui/priority/priority';
import Subtitle from '../../../../shared/ui/subtitle/subtitle';
import TextInput from '../../../../shared/ui/input/text-input';
import Option from './option/option';
import {
  reminderOptions,
  repeatOptions,
} from '../../../../shared/data/options';
import styles from './create-task.module.scss';
import DatePicker from './datetime-picker/date-picker';
import TimePicker from './datetime-picker/time-picker';
import PersonSelector from './person-selector/person-selector';
import ProjectSelector from './project-selector/project-selector';
import Button from '../../../../shared/ui/button/button';
import AttachButton from '../../../../shared/ui/attach-button/attach-button';
import type { TPriority } from '../../../../shared/types/priority';
import CloseButton from '../../../../shared/ui/close-button/close-button';
import { useAppDispatch } from '../../../../app/store/hooks';
import { createTask } from '../../model/tasksSlice';
import type { Task } from '../../../../shared/types/task';
import type { Attachment } from '../../../../shared/types/attachments';
import AttachmentItem from '../../../../shared/ui/attachments/attachments';

interface FormData {
  object: string;
  taskTitle: string;
  taskDescription: string;
  selectedDate: string;
  selectedTime: string;
  priority: TPriority;
  assigne: string;
  controller: string;
  subject: string;
  reminder: string;
  repeat: string;
  attachments: Attachment[];
}

interface CreateTaskProps {
  onClose?: () => void;
}

const CreateTask: FC<CreateTaskProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    object: '',
    taskTitle: '',
    taskDescription: '',
    selectedDate: '',
    selectedTime: '',
    priority: 'medium',
    assigne: '',
    controller: '',
    subject: '',
    reminder: 'none',
    repeat: 'none',
    attachments: [],
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'additional'>('basic');

  const handleInputChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (tab: 'basic' | 'additional') => {
    setActiveTab(tab);
  };

  const handleSubmit = async () => {
    const newTask: Omit<Task, 'id'> = {
      title: formData.taskTitle,
      description: formData.taskDescription,
      setPerson: 'Гребенников Ж. К.',
      setDate: new Date().toLocaleDateString('ru-RU'),
      status: 'in_progress',
      priority: formData.priority,
      planDate: formData.selectedDate,
      object: formData.object,
      subject: formData.subject,
      assigne: formData.assigne,
      controller: formData.controller,
      reminder: formData.reminder,
      repeat: formData.repeat,
      comments: [],
      attachments: formData.attachments,
    };
    try {
      await dispatch(createTask(newTask)).unwrap();
      onClose?.();
    } catch (error) {
      console.error('Ошибка создания задачи', error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newAttachment: Attachment = {
      id: Date.now(),
      name: file.name,
    };
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, newAttachment],
    }));
    e.target.value = '';
  };

  const handleRemoveAttachment = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== id),
    }));
  };

  return (
    <div className={styles.create_task}>
      {onClose && (
        <div className={styles.header}>
          <CloseButton onClick={onClose} />
          <h2 className={styles.header_title}>Новая задача</h2>
        </div>
      )}
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 'basic' ? styles.active : ''}`}
          onClick={() => handleTabChange('basic')}
        >
          Основное
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'additional' ? styles.active : ''}`}
          onClick={() => handleTabChange('additional')}
        >
          Дополнительно
        </div>
      </div>

      <div>
        {activeTab === 'basic' && (
          <div className={styles.section}>
            <div className={styles.create_task_title_and_item}>
              <Subtitle subtitle='Объект' required={false} />
              <TextInput
                value={formData.object}
                onChange={(e) => handleInputChange('object', e.target.value)}
                placeholder='Введите'
              />
            </div>

            <div className={styles.create_task_title_and_item}>
              <Subtitle subtitle='Название задачи' required={true} />
              <TextInput
                value={formData.taskTitle}
                onChange={(e) => handleInputChange('taskTitle', e.target.value)}
                placeholder='Введите'
              />
            </div>

            <div className={styles.create_task_title_and_item}>
              <Subtitle subtitle='Описание задачи' required={false} />
              <TextInput
                value={formData.taskDescription}
                onChange={(e) =>
                  handleInputChange('taskDescription', e.target.value)
                }
                placeholder='Введите'
              />
            </div>

            <div className={styles.date_time_box}>
              <DatePicker
                value={formData.selectedDate}
                onChange={(date) => handleInputChange('selectedDate', date)}
              />
              <TimePicker
                value={formData.selectedTime}
                onChange={(time) => handleInputChange('selectedTime', time)}
              />
            </div>

            <div className={styles.task_priority}>
              <div className={styles.task_priority_title}>
                <Subtitle subtitle='Приоритет' required={true} />
                <PriorityLabel priority={formData.priority} />
              </div>
              <PriorityPanel
                selectedPriority={formData.priority}
                onPriorityChange={(newPriority) =>
                  handleInputChange('priority', newPriority)
                }
              />
            </div>

            <div className={styles.create_task_title_and_item}>
              <Subtitle subtitle='Исполнитель задачи' required={true} />
              <PersonSelector
                placeholder='Выберите'
                onSelect={(value) => handleInputChange('assigne', value)}
                onClear={() => handleInputChange('assigne', '')}
                value={formData.assigne}
              />
            </div>

            <div className={styles.create_task_title_and_item}>
              <Subtitle subtitle='Контроллеры задачи' required={true} />
              <PersonSelector
                placeholder='Выберите'
                onSelect={(value) => handleInputChange('controller', value)}
                onClear={() => handleInputChange('controller', '')}
                value={formData.controller}
              />
            </div>

            <div className={styles.create_task_title_and_item}>
              <Subtitle subtitle='Раздел проекта' required={false} />
              <ProjectSelector
                placeholder='Выберите'
                onSelect={(value) => handleInputChange('subject', value)}
                onClear={() => handleInputChange('subject', '')}
                value={formData.subject}
              />
            </div>
          </div>
        )}

        {activeTab === 'additional' && (
          <div className={styles.section}>
            <div className={styles.create_task_title_and_item}>
              <Subtitle subtitle='Напоминания' required={false} />
              <Option
                options={reminderOptions}
                name='reminder'
                selectedValue={formData.reminder}
                onChange={(value) => handleInputChange('reminder', value)}
              />
            </div>

            <div className={styles.create_task_title_and_item}>
              <Subtitle subtitle='Повтор задачи' required={false} />
              <Option
                options={repeatOptions}
                name='repeat'
                selectedValue={formData.repeat}
                onChange={(value) => handleInputChange('repeat', value)}
              />
            </div>

            <div className={styles.create_task_title_and_item}>
              <Subtitle subtitle='Вложения' required={false} />
              <div className={styles.attachments}>
                {formData.attachments.length > 0 && (
                  <div className={styles.attachments_list}>
                    {formData.attachments.map((att) => (
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
            </div>
          </div>
        )}
      </div>

      <Button color='blue' onClick={handleSubmit}>
        Создать задачу
      </Button>
    </div>
  );
};

export default CreateTask;
