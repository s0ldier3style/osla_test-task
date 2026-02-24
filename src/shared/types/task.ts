import type { TStatus } from './status';
import type { TPriority } from './priority';
import type { Comment } from './commets';
import type { Attachment } from './attachments';

export interface Task {
  id: number;
  title: string;
  description: string;
  setPerson: string;
  setDate: string;
  status: TStatus;
  priority: TPriority;
  planDate: string;
  object: string;
  subject: string;
  assigne: string;
  controller: string;
  reminder: string;
  repeat: string;
  comments: Comment[];
  attachments: Attachment[];
}
