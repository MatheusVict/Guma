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

  static async chatWithAI(courseId, assignmentId, body, accessToken) {
    // Use fetch for streaming since axios doesn't handle SSE well in browsers
    const response = await fetch(`${api.defaults.baseURL}/chat?courseId=${courseId}&assignmentId=${assignmentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'access_token': accessToken
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response.status}`);
    }

    return response;
  }
}
