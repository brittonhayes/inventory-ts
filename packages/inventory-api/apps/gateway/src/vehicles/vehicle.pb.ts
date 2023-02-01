/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "vehicle";

export enum VehicleType {
  TRACTOR = 0,
  SPRAYER = 1,
  COMBINE = 2,
  TRUCK = 3,
  ATV = 4,
  UTV = 5,
  SEMITRUCK = 6,
  OTHER = 7,
  UNRECOGNIZED = -1,
}

export enum PowerType {
  GAS = 0,
  DIESEL = 1,
  ELECTRIC = 2,
  HYBRID = 3,
  UNRECOGNIZED = -1,
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
  getVehicle(request: VehicleRequest): Observable<VehicleResponse>;
}

export interface VehicleServiceController {
  getVehicle(request: VehicleRequest): Promise<VehicleResponse> | Observable<VehicleResponse> | VehicleResponse;
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
