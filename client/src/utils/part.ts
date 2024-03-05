interface Part {
  _id?: String,
  type: string;
  name: string;
  brand: string;
  price: string;
  imageLink: string;
  cpuCores?: string;
  cpuThreads?: string;
  cpuFrequency?: string;
  cpuSocket?: string;
  cpuRamType?: string;
  cpuIgpu?: string;
  cpuPerformance?: number;
  gpuCores?: string,
  gpuMemory?: string,
  gpuMemoryType?: string,
  gpuRecommendedPower?: string;
  gpuPerformance?: number;
  moboChipset?: string,
  moboSocketCompatibility?: string,
  moboRamCompatibility?: string,
  moboSlots?: string,
  moboType?: string,
  ramFrequency?: string,
  ramCapacity?: string,
  ramType?: string,
  powerWatts?: string,
  powerEfficiency?: string,
  powerModular?: string,
  ssdCapacity?: string,
  ssdType?: string,
  ssdSpeed?: string,
  caseForm?: string,
  caseFanSupport?: string,
  caseWcSupport?: string,
  partQuantity: number
  costBenefit: number
}

export default Part;