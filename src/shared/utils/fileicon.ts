import docxIcon from '../../assets/icons/icon-docx.svg';
import jpgIcon from '../../assets/icons/icon-jpg.svg';

export const getFileIcon = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'docx':
    case 'doc':
      return docxIcon;
    case 'jpg':
    case 'jpeg':
      return jpgIcon;
    default:
      return '';
  }
};
