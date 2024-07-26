import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helper types
type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type timeType = `${number}:${number}`;

type serviceType = {
  name: string | undefined;
  time: string | undefined;
  price: number | undefined;
};
export type businessDay = [
  boolean,
  string,
  string,
  string,
  string,
  "am" | "pm"
];

type newService = ["string", "string", "string", "string"][] | [];
/*
  step0: Personal information of the stylist.
  step1: Types of services that the business offers.
  step2: Business information including image URLs and about text.
  step3: Indicates whether the service is provided at the stylist's location or the client's location.
  step4: Address information of the business.
  step5: Business hours including the day of the week and working hours.
  step6: Services offered by the business, including the list of services and the option to add new ones.
*/

// Type definition
export type stylistSignupType = {
  currentStep: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  // Personal information of the stylist
  step0: {
    firstName: string;
    lastName: string;
    email: string;
    businessName: string;
    phone: string;
    password: string;
  };

  // Type of services that business offer
  step1: {
    "Aesthetic medicine": boolean;
    Barbershop: boolean;
    "Briads & Locs": boolean;
    "Dental & Orthodontics": boolean;
    "Hair removal": boolean;
    "Hair Salon": boolean;
    "health & Fitness": boolean;
    "Home services": boolean;
    Makeup: boolean;
  };

  // Business info => image urls + about text
  step2: {
    businessImages: string[] | undefined | null;
    menuImages: string[] | undefined | null;
    certImages: string[] | undefined | null;
    serviceFor: {
      male: boolean;
      female: boolean;
      unisex: boolean;
    };
    aboutText: string;
  };

  // Service provided at (my location or client location)
  step3: {
    "At my place": boolean;
    "At client's location": boolean;
  };

  // Address info
  step4: {
    address: string | "";
    street: string | "";
    city: string | "";
    state: string | "";
    zip_postal: string | "";
    country: string | "";
  };
  // Business hours day of week & working hours

  step5: {
    sunday: businessDay;
    monday: businessDay;
    tuesday: businessDay;
    wednesday: businessDay;
    thrusday: businessDay;
    friday: businessDay;
    saturday: businessDay;
  };

  // Add services - services that are offered
  // 1. Handle the list of services
  // 2. Also handle the add service dialog box
  // name of service , hh time ,mm time  , price
  step6: newService;
};

// Initial state
const initialState: stylistSignupType = {
  currentStep: 0,
  step0: {
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    phone: "",
    password: "",
  },
  step1: {
    "Aesthetic medicine": false,
    Barbershop: false,
    "Briads & Locs": false,
    "Dental & Orthodontics": false,
    "Hair removal": false,
    "Hair Salon": false,
    "health & Fitness": false,
    "Home services": false,
    Makeup: false,
  },
  step2: {
    businessImages: null,
    menuImages: null,
    certImages: null,
    serviceFor: {
      male: false,
      female: false,
      unisex: false,
    },
    aboutText: "",
  },
  step3: { "At my place": false, "At client's location": false },
  step4: {
    address: "",
    street: "",
    city: "",
    state: "",
    zip_postal: "",
    country: "",
  },
  step5: {
    sunday: [false, "00", "00", "00", "00", "am"],
    monday: [false, "00", "00", "00", "00", "am"],
    tuesday: [false, "00", "00", "00", "00", "am"],
    wednesday: [false, "00", "00", "00", "00", "am"],
    thrusday: [false, "00", "00", "00", "00", "am"],
    friday: [false, "00", "00", "00", "00", "am"],
    saturday: [false, "00", "00", "00", "00", "am"],
  },
  step6: [],
};

// Create slice
const stylistSlice = createSlice({
  name: "stylistSignup",
  initialState,
  reducers: {
    // Update current step
    setCurrentStep(
      state,
      action: PayloadAction<stylistSignupType["currentStep"]>
    ) {
      state.currentStep = action.payload;
    },

    // update first name
    updateFirstname(state, action: PayloadAction<string>) {
      state.step0.firstName = action.payload;
    },

    updateLastname(state, action: PayloadAction<string>) {
      state.step0.lastName = action.payload;
    },

    updateEmail(state, action: PayloadAction<string>) {
      state.step0.email = action.payload;
    },

    updateBusinessName(state, action: PayloadAction<string>) {
      state.step0.businessName = action.payload;
    },

    updatePhone(state, action: PayloadAction<string>) {
      state.step0.phone = action.payload;
    },

    updatePassword(state, action: PayloadAction<string>) {
      state.step0.password = action.payload;
    },

    // Update step0 (personal information)
    updateStep0(state, action: PayloadAction<stylistSignupType["step0"]>) {
      state.step0 = action.payload;
    },

    // Update step1 (type of services)
    updateStep1(state, action: PayloadAction<stylistSignupType["step1"]>) {
      state.step1 = action.payload;
    },

    // step 2
    updateBusinessImages(
      state,
      action: PayloadAction<stylistSignupType["step2"]["businessImages"]>
    ) {
      state.step2.businessImages = action.payload;
    },
    updateMenuImages(
      state,
      action: PayloadAction<stylistSignupType["step2"]["menuImages"]>
    ) {
      state.step2.menuImages = action.payload;
    },
    updateCertImages(
      state,
      action: PayloadAction<stylistSignupType["step2"]["certImages"]>
    ) {
      state.step2.certImages = action.payload;
    },
    // Update step2 (business info)
    updateStep2(state, action: PayloadAction<stylistSignupType["step2"]>) {
      state.step2 = action.payload;
    },

    // Update step3 (service location)
    updateStep3(state, action: PayloadAction<stylistSignupType["step3"]>) {
      state.step3 = action.payload;
    },

    // Update step4 (address info)
    updateStep4(state, action: PayloadAction<stylistSignupType["step4"]>) {
      state.step4 = action.payload;
    },

    // Update step5 (business hours)
    updateStep5(state, action: PayloadAction<stylistSignupType["step5"]>) {
      state.step5 = action.payload;
    },

    // Update step6 (services)
    updateStep6(state, action: PayloadAction<stylistSignupType["step6"]>) {
      state.step6 = action.payload;
    },
  },
});

// Export actions
export const stylistSliceActions = stylistSlice.actions;

// Export reducer
export default stylistSlice.reducer;
