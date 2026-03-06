import { Injectable } from '@angular/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from './firebase';

type LoginDoc = {
  username?: string;
  password?: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionKey = 'hospital_auth';
  private defaultsSynced = false;

  async validateLogin(name: string, password: string): Promise<boolean> {
    await this.ensureDefaultCredentials();

    const snap = await getDoc(doc(db, 'appConfig', 'login'));

    if (!snap.exists()) {
      return false;
    }

    const data = snap.data() as LoginDoc;
    return data.username === name && data.password === password;
  }

  markLoggedIn(): void {
    if (this.hasStorage()) {
      localStorage.setItem(this.sessionKey, '1');
    }
  }

  logout(): void {
    if (this.hasStorage()) {
      localStorage.removeItem(this.sessionKey);
    }
  }

  isLoggedIn(): boolean {
    return this.hasStorage() && localStorage.getItem(this.sessionKey) === '1';
  }

  private hasStorage(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private async ensureDefaultCredentials(): Promise<void> {
    if (this.defaultsSynced) {
      return;
    }

    await setDoc(
      doc(db, 'appConfig', 'login'),
      { username: 'Nihit', password: '100327' },
      { merge: true }
    );

    this.defaultsSynced = true;
  }
}
