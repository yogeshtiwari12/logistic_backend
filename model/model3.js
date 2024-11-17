import mongoose from 'mongoose';

const clientBriefSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    
    },
    brandName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    
    },
    cell: {
      type: String,
      required: true,

    },
    emailAddress: {
      type: String,
      required: true,
   
    },
    website: {
      type: String,
      required: true,

    },
    socialMedia: {
      type: String,
    },
    legalRepresentative: {
      type: String,
    },

    // Product Information
    products: {
      type: String,
    },
    productOrigin: {
      type: String,
    },

    tariffRegistration: {
      type: String,
      trim: true,
    },

    corporateColors: {
      type: String,
      trim: true,
    },
    partnersAffiliates: {
      type: String,
      trim: true,
    },
    certifications: {
      type: String,
      trim: true,
    },

    objective: {
      type: String,
      trim: true,
    },
    competitors: {
      type: String,
      trim: true,
    },
    productPresentation: {
      type: String,
      enum: ["Physical", "Virtual"],
      required: true,
    },
    requireSamples: {
      type: Boolean,
      required: true,
    },
    marketStudies: {
      type: String,
      trim: true,
    },
    paymentContact: {
      type: String,
      trim: true,
    },
    dunsBrands: {
      type: String,
      trim: true,
    },
    idCopy: {
      type: String, // Could store a file reference if needed
      trim: true,
    },

    // Export Information
    productToExport: {
      type: String,
      trim: true,
    },
    referenceNumber: {
      type: String,
      trim: true,
    },
    pgCode: {
      type: String,
      trim: true,
    },
    purchaseName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const ClientBrief = mongoose.model("ClientBrief", clientBriefSchema);

export default ClientBrief;
