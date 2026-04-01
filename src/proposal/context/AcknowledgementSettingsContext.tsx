import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ProposalAcknowledgementSettings } from '../types/proposal.types';

const STORAGE_KEY = 'zuper-proposal-ack-settings';

const DEFAULT_SETTINGS: ProposalAcknowledgementSettings = {
  enabled: true,
  pages: [
    {
      pageId: 'cover',
      pageTitle: 'Cover & About Us',
      requiresAcknowledgement: false,
      acknowledgementText: '',
    },
    {
      pageId: 'inspection',
      pageTitle: 'Inspection Summary',
      requiresAcknowledgement: true,
      acknowledgementText:
        'I acknowledge that I have reviewed the Inspection Summary and agree with the findings presented.',
    },
    {
      pageId: 'scope',
      pageTitle: 'Scope of Work & Estimate',
      requiresAcknowledgement: true,
      acknowledgementText:
        'I acknowledge that I have reviewed the Scope of Work and understand the services to be performed.',
    },
    {
      pageId: 'terms',
      pageTitle: 'Terms & Conditions',
      requiresAcknowledgement: true,
      acknowledgementText:
        'I acknowledge that I have read and agree to the Terms & Conditions outlined above.',
    },
  ],
};

function loadSettings(): ProposalAcknowledgementSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ProposalAcknowledgementSettings;
  } catch {
    // fall through
  }
  return DEFAULT_SETTINGS;
}

function persistSettings(settings: ProposalAcknowledgementSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // storage full or unavailable
  }
}

interface AcknowledgementSettingsContextValue {
  settings: ProposalAcknowledgementSettings;
  updateSettings: (next: ProposalAcknowledgementSettings) => void;
}

const AcknowledgementSettingsContext = createContext<AcknowledgementSettingsContextValue | null>(null);

export function AcknowledgementSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ProposalAcknowledgementSettings>(loadSettings);

  const updateSettings = useCallback((next: ProposalAcknowledgementSettings) => {
    setSettings(next);
    persistSettings(next);
  }, []);

  return (
    <AcknowledgementSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AcknowledgementSettingsContext.Provider>
  );
}

export function useAcknowledgementSettings() {
  const ctx = useContext(AcknowledgementSettingsContext);
  if (!ctx) {
    throw new Error('useAcknowledgementSettings must be used within AcknowledgementSettingsProvider');
  }
  return ctx;
}
