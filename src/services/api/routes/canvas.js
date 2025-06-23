import {api} from "@/services/api/config/config.js";

export class CanvasRequest {
  constructor() {
  }

  static async getAllDisciplinesEnrolled(accessToken) {
    const response = await api.get('/canvas/courses', {
      headers: {
        'access_token': accessToken
      }
    })

    if (response.code === 401 || response.code === 403) throw new Error('Unauthorized');

    return response.data;
  }

  static async getAssignmentsByCourseId(courseId, accessToken) {
    const response = await api.get(`/canvas/assignments/${courseId}`, {
      headers: {
        'access_token': accessToken
      }
    })

    if (response.code === 401 || response.code === 403) throw new Error('Unauthorized');
    return response.data;
  }

  static async getAssignmentById(courseId, assignmentId, accessToken) {
    const response = await api.get(`/canvas/assignment/${courseId}/${assignmentId}`, {
      headers: {
        'access_token': accessToken
      }
    })

    if (response.code === 401 || response.code === 403) throw new Error('Unauthorized');
    return response.data;
  }
}
