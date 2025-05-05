import ApiClient from "../client";
import { ApiResponse, getApiConfig } from "../config";
import { endpoints } from "../endpoints";

export interface Event {
  created_at: number;
  created_by: string;
  description: string;
  id: string;
  name: string;
  updated_at: number;
}
class EventService {
  private api: ApiClient

  constructor(){
    this.api = ApiClient.getInstance(getApiConfig());
  }

  /**
   * Get some last events for specified job position
   * @param limit if be 0, no limit will be applied
   */
  getJPEvents = async (jpID: string, limit: number = 50, offset: number = 0): Promise<ApiResponse<Event[]>> => {
    try{
      return this.api.get<Event[]>(endpoints.events.list(), {
        params: {
          jpid: jpID,
          limit: limit,
          offset: offset
        }
      })
    } catch (err){
      throw Error(`failed to get list of job positions for user with jobPositionID=${jpID}: ${(err as Error).message}`)
    }
  }

  createEvent = async (event: Event): Promise<ApiResponse<Event>> => {
    try{
      return this.api.post<Event>(endpoints.events.create(), event)
    } catch (err){
      throw Error(`failed to create event: ${(err as Error).message}`)
    }
  }
}

export const eventService = new EventService();