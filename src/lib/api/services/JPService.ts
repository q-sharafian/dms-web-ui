import ApiClient from "../client";
import { ApiResponse, getApiConfig } from "../config";
import { endpoints } from "../endpoints";

export interface JobPosition {
  created_at: number;
  id: string;
  parent_id: string;
  region_id: string;
  title: string;
  user_id: string;
}

class JPService {
  private api: ApiClient

  constructor(){
    this.api = ApiClient.getInstance(getApiConfig());
  }

  getCurrentUserJPs = async (userID: string): Promise<ApiResponse<JobPosition[]>> => {
    try{
      return this.api.get<JobPosition[]>(endpoints.jobPositions.listCurrentUserJPs(userID))
    } catch (err){
      throw Error(`failed to get list of job positions for user with ID=${userID}: ${(err as Error).message}`)
    }
  }
}

export const jpService = new JPService();