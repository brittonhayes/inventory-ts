/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "vehicle";

export enum VehicleType {
  TRACTOR = "TRACTOR",
  SPRAYER = "SPRAYER",
  COMBINE = "COMBINE",
  TRUCK = "TRUCK",
  ATV = "ATV",
  UTV = "UTV",
  SEMITRUCK = "SEMITRUCK",
  OTHER = "OTHER",
}

export enum PowerType {
  GAS = "GAS",
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
}

export interface VehicleRequest {
  id: string;
}

export interface VehicleResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  make: string;
  model: string;
  year: string;
  vehicleType: VehicleType;
  machineHours: number;
  powerType: PowerType;
}

export const VEHICLE_PACKAGE_NAME = "vehicle";

export interface VehicleServiceClient {
  getVehicle(request: VehicleRequest, ...rest: any): Observable<VehicleResponse>;
}

export interface VehicleServiceController {
  getVehicle(
    request: VehicleRequest,
    ...rest: any
  ): Promise<VehicleResponse> | Observable<VehicleResponse> | VehicleResponse;
}

export function VehicleServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getVehicle"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("VehicleService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("VehicleService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const VEHICLE_SERVICE_NAME = "VehicleService";
