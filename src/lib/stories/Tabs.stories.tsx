import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tabs } from '../Tabs/Tabs';
import { Tab } from '../Tabs/Tab';
import { TabPanel } from '../Tabs/TabPanel';
import { ThemeProvider } from '@thanh-libs/theme';

// ─── Icon Helpers ────────────────────────────────────────

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.08a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.08a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => {
  const [val, setVal] = useState<string | number>('one');
  return (
    <>
      <Tabs value={val} onChange={setVal}>
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" disabled />
      </Tabs>
      <TabPanel value="one" selectedValue={val}>First panel content</TabPanel>
      <TabPanel value="two" selectedValue={val}>Second panel content</TabPanel>
      <TabPanel value="three" selectedValue={val}>Third panel content (disabled, cannot be reached via click)</TabPanel>
    </>
  );
};

// ─── With Icons ──────────────────────────────────────────

const WithIconsStory = () => {
  const [val, setVal] = useState<string | number>('home');
  return (
    <>
      <Tabs value={val} onChange={setVal}>
        <Tab value="home" label="Home" icon={<HomeIcon />} />
        <Tab value="favorites" label="Favorites" icon={<StarIcon />} />
        <Tab value="profile" label="Profile" icon={<UserIcon />} />
        <Tab value="settings" label="Settings" icon={<SettingsIcon />} />
      </Tabs>
      <TabPanel value="home" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Welcome home! This is your dashboard.</div>
      </TabPanel>
      <TabPanel value="favorites" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Your favorite items will appear here.</div>
      </TabPanel>
      <TabPanel value="profile" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Edit your profile settings.</div>
      </TabPanel>
      <TabPanel value="settings" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Application settings and preferences.</div>
      </TabPanel>
    </>
  );
};

// ─── Vertical ────────────────────────────────────────────

const VerticalStory = () => {
  const [val, setVal] = useState<string | number>('1');
  return (
    <div style={{ display: 'flex' }}>
      <Tabs value={val} onChange={setVal} orientation="vertical">
        <Tab value="1" label="Tab 1" />
        <Tab value="2" label="Tab 2" />
        <Tab value="3" label="Tab 3" />
      </Tabs>
      <TabPanel value="1" selectedValue={val}>Information regarding Tab 1</TabPanel>
      <TabPanel value="2" selectedValue={val}>Information regarding Tab 2</TabPanel>
      <TabPanel value="3" selectedValue={val}>Information regarding Tab 3</TabPanel>
    </div>
  );
};

// ─── Full Width ──────────────────────────────────────────

const FullWidthStory = () => {
  const [val, setVal] = useState<string | number>('1');
  return (
    <>
      <Tabs value={val} onChange={setVal} variant="fullWidth">
        <Tab value="1" label="First" />
        <Tab value="2" label="Second" />
        <Tab value="3" label="Third" />
      </Tabs>
      <TabPanel value="1" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Each tab takes equal width of the container.</div>
      </TabPanel>
      <TabPanel value="2" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Content for second tab.</div>
      </TabPanel>
      <TabPanel value="3" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Content for third tab.</div>
      </TabPanel>
    </>
  );
};

// ─── Scrollable ──────────────────────────────────────────

const ScrollableStory = () => {
  const [val, setVal] = useState<string | number>('1');
  return (
    <div style={{ width: 300 }}>
      <Tabs value={val} onChange={setVal} variant="scrollable">
        {Array.from({ length: 15 }).map((_, i) => (
          <Tab key={i} value={`${i}`} label={`Tab ${i}`} />
        ))}
      </Tabs>
      <TabPanel value="5" selectedValue={val}>Scroll to see 5th tab selected.</TabPanel>
    </div>
  );
};

// ─── Disabled Tabs ───────────────────────────────────────

const DisabledTabsStory = () => {
  const [val, setVal] = useState<string | number>('1');
  return (
    <>
      <Tabs value={val} onChange={setVal}>
        <Tab value="1" label="Active" />
        <Tab value="2" label="Disabled" disabled />
        <Tab value="3" label="Active" />
        <Tab value="4" label="Disabled" disabled />
        <Tab value="5" label="Active" />
      </Tabs>
      <TabPanel value="1" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Tab 1 content. Tab 2 and Tab 4 are disabled and cannot be selected.</div>
      </TabPanel>
      <TabPanel value="3" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Tab 3 content.</div>
      </TabPanel>
      <TabPanel value="5" selectedValue={val}>
        <div style={{ padding: '16px 0' }}>Tab 5 content.</div>
      </TabPanel>
    </>
  );
};

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: any) => {
  const [val, setVal] = useState<string | number>('1');
  return (
    <div style={{ display: args.orientation === 'vertical' ? 'flex' : 'block', width: args.variant === 'scrollable' ? 300 : '100%' }}>
      <Tabs value={val} onChange={setVal} orientation={args.orientation} variant={args.variant}>
        <Tab value="1" label="First Tab" icon={args.showIcons ? <HomeIcon /> : undefined} />
        <Tab value="2" label="Second Tab" icon={args.showIcons ? <StarIcon /> : undefined} />
        <Tab value="3" label="Third Tab" disabled={args.disabledTab} icon={args.showIcons ? <UserIcon /> : undefined} />
      </Tabs>
      <TabPanel value="1" selectedValue={val}>Content for First Tab</TabPanel>
      <TabPanel value="2" selectedValue={val}>Content for Second Tab</TabPanel>
      <TabPanel value="3" selectedValue={val}>Content for Third Tab</TabPanel>
    </div>
  );
};

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Tabs/Tabs',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 40 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const Basic: StoryObj = { name: 'Basic', render: () => <BasicStory /> };
export const WithIcons: StoryObj = { name: 'With Icons', render: () => <WithIconsStory /> };
export const Vertical: StoryObj = { name: 'Vertical', render: () => <VerticalStory /> };
export const FullWidth: StoryObj = { name: 'Full Width', render: () => <FullWidthStory /> };
export const Scrollable: StoryObj = { name: 'Scrollable', render: () => <ScrollableStory /> };
export const DisabledTabs: StoryObj = { name: 'Disabled Tabs', render: () => <DisabledTabsStory /> };

export const Playground: StoryObj = {
  name: 'Playground',
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['standard', 'scrollable', 'fullWidth'] },
    disabledTab: { control: 'boolean' },
    showIcons: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    variant: 'standard',
    disabledTab: false,
    showIcons: false,
  },
  render: (args: any) => <PlaygroundStory {...args} />,
};
