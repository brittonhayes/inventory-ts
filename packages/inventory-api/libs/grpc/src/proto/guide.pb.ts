/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'guide';

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

export enum OrderBy {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
}

export interface GuideRequest {
  id: string;
}

export interface GuideResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  content: string;
}

export interface ListGuidesRequest {
  skip?: number | undefined;
  take?: number | undefined;
  sortBy?: SortDirection | undefined;
  orderBy?: OrderBy | undefined;
  search?: string | undefined;
}

export interface ListGuidesResponse {
  guides: GuideResponse[];
}

export interface CreateGuideRequest {
  name: string;
  content: string;
}

export interface UpdateGuideRequest {
  id?: string | undefined;
  name?: string | undefined;
  content?: string | undefined;
}

export interface DeleteGuideRequest {
  id: string;
}

export const GUIDE_PACKAGE_NAME = 'guide';

export interface GuideServiceClient {
  findGuide(request: GuideRequest, ...rest: any): Observable<GuideResponse>;

  listGuides(request: ListGuidesRequest, ...rest: any): Observable<ListGuidesResponse>;

  createGuide(request: CreateGuideRequest, ...rest: any): Observable<GuideResponse>;

  updateGuide(request: UpdateGuideRequest, ...rest: any): Observable<GuideResponse>;

  deleteGuide(request: DeleteGuideRequest, ...rest: any): Observable<GuideResponse>;
}

export interface GuideServiceController {
  findGuide(request: GuideRequest, ...rest: any): Promise<GuideResponse> | Observable<GuideResponse> | GuideResponse;

  listGuides(
    request: ListGuidesRequest,
    ...rest: any
  ): Promise<ListGuidesResponse> | Observable<ListGuidesResponse> | ListGuidesResponse;

  createGuide(
    request: CreateGuideRequest,
    ...rest: any
  ): Promise<GuideResponse> | Observable<GuideResponse> | GuideResponse;

  updateGuide(
    request: UpdateGuideRequest,
    ...rest: any
  ): Promise<GuideResponse> | Observable<GuideResponse> | GuideResponse;

  deleteGuide(
    request: DeleteGuideRequest,
    ...rest: any
  ): Promise<GuideResponse> | Observable<GuideResponse> | GuideResponse;
}

export function GuideServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findGuide', 'listGuides', 'createGuide', 'updateGuide', 'deleteGuide'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('GuideService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('GuideService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const GUIDE_SERVICE_NAME = 'GuideService';
