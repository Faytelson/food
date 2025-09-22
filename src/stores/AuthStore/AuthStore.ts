import { makeAutoObservable, runInAction } from "mobx";
import api from "@api/axios";

export type User = {
  id: number;
  username: string;
  email: string;
};

class AuthStore {
  user: User | null = null;
  jwt: string | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
    const token = localStorage.getItem("jwt");
    if (token) {
      this.jwt = token;
      this.setAuthHeader(token);
      this.initialize();
    }
  }

  get isAuth(): boolean {
    return !!this.user;
  }

  private setAuthHeader(token: string | null) {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }

  async initialize() {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    this.setAuthHeader(token);
    this.loading = true;
    try {
      const res = await api.get("/users/me");
      runInAction(() => {
        this.user = res.data;
        this.jwt = token;
      });
    } catch {
      runInAction(() => {
        this.user = null;
        this.jwt = null;
      });
      localStorage.removeItem("jwt");
      this.setAuthHeader(null);
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async login(identifier: string, password: string) {
    this.loading = true;
    try {
      const res = await api.post("/auth/local", { identifier, password });
      runInAction(() => {
        this.user = res.data.user;
        this.jwt = res.data.jwt;
      });
      localStorage.setItem("jwt", res.data.jwt);
      this.setAuthHeader(res.data.jwt);
    } catch (e) {
      throw new Error(`Login failed ${e}`);
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  async register(username: string, email: string, password: string) {
    this.loading = true;
    try {
      const res = await api.post("/auth/local/register", { username, email, password });
      runInAction(() => {
        this.user = res.data.user;
        this.jwt = res.data.jwt;
      });
      localStorage.setItem("jwt", res.data.jwt);
      this.setAuthHeader(res.data.jwt);
    } catch (e) {
      throw new Error(`Registration failed ${e}`);
    } finally {
      runInAction(() => (this.loading = false));
    }
  }

  logout() {
    runInAction(() => {
      this.user = null;
      this.jwt = null;
    });
    localStorage.removeItem("jwt");
    this.setAuthHeader(null);
  }
}

export const authStore = new AuthStore();
export default authStore;
