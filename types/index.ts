export type UserRole =
  | "super_admin"
  | "company_owner"
  | "manager"
  | "dispatcher"
  | "accountant"
  | "driver"
  | "read_only";

export type LoadStatus =
  | "pending"
  | "assigned"
  | "in_transit"
  | "delivered"
  | "invoiced"
  | "paid"
  | "cancelled";

export type DriverStatus = "active" | "inactive" | "suspended" | "on_load";

export type UnitStatus = "active" | "inactive" | "maintenance" | "out_of_service";

export interface Tenant {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  accentColor: string;
  dotNumber: string;
  mcNumber: string;
  subscription: "basic" | "professional" | "enterprise";
}

export interface User {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Driver {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  unitNo: string;
  oopId: string;
  status: DriverStatus;
  phone: string;
  email?: string;
  licenseNumber: string;
  licenseExpiry: string;
  medicalExpiry: string;
  hireDate: string;
  totalMiles: number;
  totalRevenue: number;
}

export interface Load {
  id: string;
  tenantId: string;
  loadNumber: string;
  status: LoadStatus;
  driverId?: string;
  truckId?: string;
  trailerId?: string;
  customerId: string;
  brokerId?: string;
  pickupDate: string;
  deliveryDate: string;
  pickupLocation: string;
  deliveryLocation: string;
  miles: number;
  weight: number;
  commodity: string;
  rate: number;
  brokerFee?: number;
  factoringFee?: number;
  profit?: number;
  createdAt: string;
}

export interface OopDeduction {
  id: string;
  tenantId: string;
  driverId: string;
  driverFirstName: string;
  driverLastName: string;
  unitNo: string;
  oopId: string;
  date: string;
  insuranceFee: number;
  iftaFee: number;
  cashAdvanceFee: number;
  fuelFee: number;
  trailerFee: number;
  repairFee: number;
  parkingFee: number;
  fee2290: number;
  eldFee: number;
  tollFee: number;
  irpFee: number;
  ucrFee: number;
  otherFee: number;
  total: number;
  notes?: string;
  receiptUrl?: string;
  approved: boolean;
  createdAt: string;
}

export interface MetricCard {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}
