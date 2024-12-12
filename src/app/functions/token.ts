import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IToken } from "../../interfaces";
import { RootState } from "../store";
import Cookies from "universal-cookie";

export interface IContact {
  id: number | null;
  name: string | null;
  email: string | null;
  number: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: number | null;
  group_id: number | null;
}

export interface IGroup {
  id: number | null;
  name: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: number | null;
}

export interface ISender {
  id: number | null;
  type: string | null;
  sender: string | null;
  status: string | number | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: number | null;
}

export interface ITemplates {
  id: number | null;
  name: string | null;
  text: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: number | null;
}

interface TokenState {
  access_token: string | null;
  user: {
    id: number | null;
    name: string | null;
    email: string | null;
    address: string | null;
    image: string | null;
    phone: string | null;
    balance: string | null;
    will_expire: string | null;
    email_verified_at: string | null;
    last_login_at: string | null;
    client_secret: string | null;
    sms_alert: number | null;
    plan_id: number | null;
  };
  groups: IGroup[];
  contacts: IContact[];
  senderids: ISender[];
  templates: ITemplates[];
}

const cookie = new Cookies();

const initialState: TokenState = {
  access_token: cookie.get("userLogged")?.access_token || null,
  user: cookie.get("userLogged")?.user || {
    id: null,
    email: null,
    address: null,
    image: null,
    name: null,
    balance: null,
    will_expire: null,
    last_login_at: null,
    client_secret: null,
    sms_alert: null,
    plan_id: null,
  },
  groups: [],
  contacts: [],
  senderids: [],
  templates: [],
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IToken>) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
    },
    clearToken: (state) => {
      state.access_token = null;
      state.user = {
        id: null,
        email: null,
        address: null,
        image: null,
        name: null,
        phone: null,
        balance: null,
        will_expire: null,
        email_verified_at: null,
        last_login_at: null,
        client_secret: null,
        sms_alert: null,
        plan_id: null,
      };
      state.groups = [];
      state.contacts = [];
      state.senderids = [];
      state.templates = [];
    },
    setContacts: (state, action: PayloadAction<IContact[]>) => {
      state.contacts = action.payload;
    },
    addContact: (state, action: PayloadAction<IContact>) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    removeContacts: (state, action: PayloadAction<number[] | null>) => {
      const idsToRemove = action.payload || [];
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== null && !idsToRemove.includes(contact.id)
      );
    },
    updateContact: (state, action: PayloadAction<IContact>) => {
      state.contacts = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
    },
    setGroups: (state, action: PayloadAction<IGroup[]>) => {
      state.groups = action.payload;
    },
    addGroup: (state, action: PayloadAction<IGroup>) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
    },

    removeGroups: (state, action: PayloadAction<number[] | null>) => {
      const idsToRemove = action.payload || [];
      state.groups = state.groups.filter(
        (group) => group.id !== null && !idsToRemove.includes(group.id)
      );
    },
    updateGroup: (state, action: PayloadAction<IGroup>) => {
      state.groups = state.groups.map((group) =>
        group.id === action.payload.id ? action.payload : group
      );
    },
    setSenders: (state, action: PayloadAction<ISender[]>) => {
      state.senderids = action.payload;
    },
    addSender: (state, action: PayloadAction<ISender>) => {
      state.senderids.push(action.payload);
    },
    removeSender: (state, action: PayloadAction<number>) => {
      state.senderids = state.senderids.filter(
        (sender) => sender.id !== action.payload
      );
    },
    removeSenders: (state, action: PayloadAction<number[] | null>) => {
      const idsToRemove = action.payload || [];
      state.senderids = state.senderids.filter(
        (sender) => sender.id !== null && !idsToRemove.includes(sender.id)
      );
    },
    updateSender: (state, action: PayloadAction<ISender>) => {
      state.senderids = state.senderids.map((sender) =>
        sender.id === action.payload.id ? action.payload : sender
      );
    },
    setTemplates: (state, action: PayloadAction<ITemplates[]>) => {
      state.templates = action.payload;
    },
    addTemplate: (state, action: PayloadAction<ITemplates>) => {
      state.templates.push(action.payload);
    },
    removeTemplate: (state, action: PayloadAction<number>) => {
      state.templates = state.templates.filter(
        (template) => template.id !== action.payload
      );
    },
    removeTemplates: (state, action: PayloadAction<number[] | null>) => {
      const idsToRemove = action.payload || [];
      state.templates = state.templates.filter(
        (template) => template.id !== null && !idsToRemove.includes(template.id)
      );
    },
    updateTemplate: (state, action: PayloadAction<ITemplates>) => {
      state.templates = state.templates.map((template) =>
        template.id === action.payload.id ? action.payload : template
      );
    },
    updateSmsAlert: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.sms_alert = action.payload;
      }
    },
    updateClientSecret: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.client_secret = action.payload;
      }
    },
    updateBalance: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.balance = action.payload;
      }
    },
    updateUserProfile: (state, action) => {
      const { name, email, address, image } = action.payload;
      if (name !== undefined) state.user.name = name;
      if (email !== undefined) state.user.email = email;
      if (address !== undefined) state.user.address = address;
      if (image !== undefined) state.user.image = image;
    },
  },
});

export const {
  setToken,
  clearToken,
  setGroups,
  addGroup,
  removeGroup,
  removeGroups,
  updateGroup,
  setContacts,
  addContact,
  removeContact,
  removeContacts,
  updateContact,
  setSenders,
  addSender,
  removeSender,
  removeSenders,
  updateSender,
  setTemplates,
  addTemplate,
  removeTemplate,
  removeTemplates,
  updateTemplate,
  updateSmsAlert,
  updateBalance,
  updateClientSecret,
  updateUserProfile,
} = tokenSlice.actions;

export const tokenSelector = (state: RootState) => state.token;

export default tokenSlice.reducer;
