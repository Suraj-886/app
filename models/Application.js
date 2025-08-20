const mongoose = require('mongoose');
const path = require('path');

const applicationSchema = new mongoose.Schema({
  applicationNumber: { type: String, unique: true, required: true },
  unitName: { type: String, required: true },
  isWomenEntrepreneur: String,
  capableEntrepreneur: String,
  category: String,
  proprietors: [{
    name: String,
    share: Number
  }],
  director: String,
  registeredEnterprise: String,
  mobile: { type: String, required: true },
  address: String,
  phone: String,
  email: String,
  gstNumber: String,
  udyamNumber: { type: String, required: true },

  filedITR: String,
  itrCertificate: String,
  loan: String,
  loanDetails: String,
  property: {
    land: Number,
    building: Number,
    plantMachinery: Number,
    otherAssets: Number
  },

  machinery: [{
    name: String,
    imported: String,
    value: Number
  }],
  energySource: String,

  products: [{
    name: String,
    capacity: String
  }],
  perm_male: Number,
  perm_female: Number,
  perm_sc: Number,
  perm_st: Number,
  perm_obc: Number,
  perm_disabled: Number,
  temp_male: Number,
  temp_female: Number,

  productCosts: [{
    year: String,
    cost: Number
  }],
  productionCapacity: [{
    product: String,
    year: String,
    capacity: String,
    actual: String,
    utilization: Number
  }],

  profit: [{
    year: String,
    value: Number,
    percent: Number,
    remark: String
  }],
  netProfit: [{
    year: String,
    value: Number,
    percent: Number,
    remark: String
  }],

  techUsed: String,
  techDesc: String,
  prodDev: String,
  prodDevDesc: String,
  qualityCert: String,
  qualityCertDesc: String,
  qualityStandard: String,
  qualityStandardDesc: String,
  exportData: [{
    product: String,
    country: String,
    year: String,
    quantity: Number,
    percent: Number
  }],

  hireSetup: String,
  hireSetupDesc: String,
  training: String,
  trainingDesc: String,
  facilities: {
    toilet: Boolean,
    canteen: Boolean,
    health: Boolean,
    recreation: Boolean,
    library: Boolean,
    transport: Boolean
  },
  pensionInfo: String,
  pensionDocument: String,

  pollution: [{
    name: String,
    year: String,
    cost: Number
  }],

  vendorDev: String,
  vendorDevDesc: String,

  otherInfo: String,

  verificationUnitName: String,
  verificationDate: Date,
  applicantName: String,
  designation: String,
  signature: String,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

applicationSchema.virtual('itrCertificatePath').get(function() {
  return this.itrCertificate ? path.join('uploads', this.itrCertificate) : null;
});

applicationSchema.virtual('pensionDocumentPath').get(function() {
  return this.pensionDocument ? path.join('uploads', this.pensionDocument) : null;
});

applicationSchema.virtual('signaturePath').get(function() {
  return this.signature ? path.join('uploads', this.signature) : null;
});

module.exports = mongoose.model('Application', applicationSchema);
