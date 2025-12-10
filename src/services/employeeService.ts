import ApiClient, { axiosInstance } from "./api-client";
import type { Employee } from "../entities/Employee";

export type User = {
  userId: number;
  username: string;
  role: string;
  employeeId?: number;
  employee?: Employee | null;
};

class EmployeeService extends ApiClient<Employee> {
  constructor() {
    super("Employees"); // base path: /Employees
  }

  // ---------------------------------------
  // GET employee by ID
  // ---------------------------------------
  async getById(id: number): Promise<Employee> {
    const response = await axiosInstance.get(`/Employees/${id}`);
    return response.data;
  }

  // ---------------------------------------
  // GET employee routes by employeeId
  // ---------------------------------------
  async getRoutesByEmployeeId(employeeId: number) {
    const response = await axiosInstance.get(
      `/Employee/get-employee-routes-by-id/${employeeId}`
    );
    return response.data;
  }
}

export const employeeService = new EmployeeService();
export type { Employee };
