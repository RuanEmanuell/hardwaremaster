interface Part {
  _id?: string,
  type: string;
  name: string;
  brand: string;
  price: string;
  imageLink: string;
  cpuCores?: number;
  cpuThreads?: number;
  cpuFrequency?: string;
  cpuSocket?: string;
  cpuRamType?: string;
  cpuIgpu?: string;
  cpuPerformance?: number;
  gpuCores?: string,
  gpuMemory?: string,
  gpuMemoryType?: string,
  gpuRecommendedPower?: number;
  gpuPerformance?: number;
  moboChipset?: string,
  moboSocketCompatibility?: string,
  moboRamCompatibility?: string,
  moboSlots?: number,
  moboType?: string,
  ramFrequency?: number,
  ramCapacity?: number,
  ramType?: string,
  powerWatts?: number,
  powerEfficiency?: string,
  powerModular?: string,
  ssdCapacity?: number,
  ssdType?: string,
  ssdSpeed?: number,
  caseForm?: string,
  caseFanSupport?: number,
  caseWcSupport?: number,
  partQuantity: number
  costBenefit: number
}

export default Part;