/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Attachment = {
  __typename?: 'Attachment';
  compatibleVehicles?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isOwned?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum Condition {
  Broken = 'BROKEN',
  Good = 'GOOD',
  Mint = 'MINT',
  Poor = 'POOR'
}

export type CreateVehicleDto = {
  condition?: InputMaybe<Condition>;
  link?: InputMaybe<Scalars['String']>;
  machineHours?: InputMaybe<Scalars['Int']>;
  make: Scalars['String'];
  model: Scalars['String'];
  name: Scalars['String'];
  power?: PowerType;
  vehicleType: VehicleType;
  year?: InputMaybe<Scalars['Int']>;
};

export type Employee = {
  __typename?: 'Employee';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  tasks?: Maybe<Array<MaintenanceTask>>;
  updatedAt: Scalars['DateTime'];
};

export type Implement = {
  __typename?: 'Implement';
  compatibleAttachments?: Maybe<Array<Attachment>>;
  compatibleVehicles?: Maybe<Array<Vehicle>>;
  condition?: Maybe<Condition>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  implementType?: Maybe<ImplementType>;
  isOwned?: Maybe<Scalars['Boolean']>;
  make: Scalars['String'];
  model: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  year?: Maybe<Scalars['Int']>;
};

export enum ImplementType {
  Chisel = 'CHISEL',
  Cultivator = 'CULTIVATOR',
  Drill = 'DRILL',
  Harrow = 'HARROW',
  Mower = 'MOWER',
  Other = 'OTHER',
  Rodweeder = 'RODWEEDER',
  Sprayer = 'SPRAYER',
  Trailer = 'TRAILER'
}

export type MaintenanceGuide = {
  __typename?: 'MaintenanceGuide';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  tasks?: Maybe<Array<MaintenanceTask>>;
  updatedAt: Scalars['DateTime'];
  vehicle?: Maybe<Vehicle>;
  vehicleId?: Maybe<Scalars['String']>;
};

export type MaintenanceTask = {
  __typename?: 'MaintenanceTask';
  assignee?: Maybe<Employee>;
  assigneeId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  dueDate: Scalars['DateTime'];
  guide?: Maybe<MaintenanceGuide>;
  guideId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  machineHours?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  status: TaskStatus;
  tools?: Maybe<Array<Tool>>;
  updatedAt: Scalars['DateTime'];
  vehicle?: Maybe<Vehicle>;
  vehicleId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addVehicle: Vehicle;
  removeVehicle: Scalars['Boolean'];
};


export type MutationAddVehicleArgs = {
  createVehicleDto: CreateVehicleDto;
};


export type MutationRemoveVehicleArgs = {
  id: Scalars['String'];
};

export enum PowerType {
  Diesel = 'DIESEL',
  Electric = 'ELECTRIC',
  Gas = 'GAS',
  Hybrid = 'HYBRID'
}

export type Query = {
  __typename?: 'Query';
  employee: Employee;
  employees: Array<Employee>;
  implement: Implement;
  implements: Array<Implement>;
  part: VehiclePart;
  parts: Array<VehiclePart>;
  vehicle: Vehicle;
  vehicles: Array<Vehicle>;
};


export type QueryEmployeeArgs = {
  id: Scalars['String'];
};


export type QueryImplementArgs = {
  id: Scalars['String'];
};


export type QueryImplementsArgs = {
  attachmentId?: InputMaybe<Scalars['String']>;
  vehicleId?: InputMaybe<Scalars['String']>;
};


export type QueryPartArgs = {
  id: Scalars['String'];
};


export type QueryVehicleArgs = {
  filters?: InputMaybe<VehicleQuery>;
  id: Scalars['String'];
};


export type QueryVehiclesArgs = {
  filters?: InputMaybe<VehicleQuery>;
};

export enum TaskStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Incomplete = 'INCOMPLETE'
}

export type Tool = {
  __typename?: 'Tool';
  id: Scalars['String'];
  name: Scalars['String'];
  tasks?: Maybe<Array<MaintenanceTask>>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  compatibleAttachments?: Maybe<Array<Attachment>>;
  compatibleImplements?: Maybe<Array<Implement>>;
  compatibleParts?: Maybe<Array<VehiclePart>>;
  condition: Condition;
  createdAt: Scalars['DateTime'];
  guides?: Maybe<Array<MaintenanceGuide>>;
  id: Scalars['String'];
  isOwned?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
  machineHours: Scalars['Int'];
  make: Scalars['String'];
  model: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  power: PowerType;
  updatedAt: Scalars['DateTime'];
  vehicleType: VehicleType;
  year?: Maybe<Scalars['Int']>;
};

export type VehiclePart = {
  __typename?: 'VehiclePart';
  compatibleVehicles?: Maybe<Array<Vehicle>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type VehicleQuery = {
  includeAttachments?: InputMaybe<Scalars['Boolean']>;
  includeGuides?: InputMaybe<Scalars['Boolean']>;
  includeImplements?: InputMaybe<Scalars['Boolean']>;
  includeParts?: InputMaybe<Scalars['Boolean']>;
};

export enum VehicleType {
  Atv = 'ATV',
  Combine = 'COMBINE',
  Other = 'OTHER',
  Semitruck = 'SEMITRUCK',
  Sprayer = 'SPRAYER',
  Tractor = 'TRACTOR',
  Truck = 'TRUCK',
  Utv = 'UTV'
}

export type ListVehiclesQueryVariables = Exact<{
  includeAttachments?: InputMaybe<Scalars['Boolean']>;
  includeImplements?: InputMaybe<Scalars['Boolean']>;
  includeParts?: InputMaybe<Scalars['Boolean']>;
}>;


export type ListVehiclesQuery = { __typename?: 'Query', vehicles: Array<{ __typename?: 'Vehicle', id: string, name?: string | null, make: string, model: string, vehicleType: VehicleType, machineHours: number, updatedAt: any, createdAt: any }> };


export const ListVehiclesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListVehicles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includeAttachments"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includeImplements"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includeParts"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"includeAttachments"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includeAttachments"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"includeImplements"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includeImplements"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"includeParts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includeParts"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"vehicleType"}},{"kind":"Field","name":{"kind":"Name","value":"machineHours"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ListVehiclesQuery, ListVehiclesQueryVariables>;