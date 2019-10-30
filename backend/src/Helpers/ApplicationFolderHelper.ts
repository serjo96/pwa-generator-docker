import * as path from 'path';

export function getTemplateFolderPath(templateId: string) {
  return `./files/images/templates/${templateId}`;
}

export function getApplicationFolderPath(userId: string, applicationId: string) {
  return `./src/View/images/${userId}/${applicationId}`;
}

export function getApplicationFilePath(userId: string, applicationId: string, filename: string) {
  return path.join(getApplicationFolderPath(userId, applicationId), filename);
}

export function getTemplateFilePath(templateId: string, filename: string) {
  return path.join(getTemplateFolderPath(templateId), filename);
}
