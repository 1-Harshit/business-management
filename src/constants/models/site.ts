export interface Site {
  ID: number
  createdAt: Date
  updatedAt: Date
  name: string
  address: string
  isActive: boolean
  // Fields for tender details
  agreementDate: Date
  completionDate: Date
  agreementInfo: string
  department: string
  tenderInfo: string
  workName: string
  boqCost: number
  fund: string
  agency: string
  rate: string
  estimatedCost: number
  agreementValue: number
}