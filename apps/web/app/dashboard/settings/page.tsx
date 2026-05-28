// app/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Moon,
  Sun,
  Laptop,
  Mail,
  Phone,
  MapPin,
  Building,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import clsx from 'clsx';

// Types
type TabType = 'profile' | 'notifications' | 'appearance' | 'security';

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  bio: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  orderUpdates: boolean;
  productAlerts: boolean;
  weeklyDigest: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  loginAlerts: boolean;
}

type ThemeMode = 'light' | 'dark' | 'system';

export default function SettingsPage() {
  // Active tab
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Profile form state
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    bio: ''
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    orderUpdates: true,
    productAlerts: true,
    weeklyDigest: false
  });

  // Appearance state
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [compactView, setCompactView] = useState(false);

  // Security state
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginAlerts: true
  });

  // Password change state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Tab configuration
  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'appearance', label: 'Giao diện', icon: Palette },
    { id: 'security', label: 'Bảo mật', icon: Shield }
  ];

  // Get theme icon
  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light': return <Sun className="w-4 h-4" />;
      case 'dark': return <Moon className="w-4 h-4" />;
      default: return <Laptop className="w-4 h-4" />;
    }
  };

  // Get theme label
  const getThemeLabel = () => {
    switch (themeMode) {
      case 'light': return 'Sáng';
      case 'dark': return 'Tối';
      default: return 'Hệ thống';
    }
  };

  // Handle profile change
  const handleProfileChange = (field: keyof ProfileFormData, value: string) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle notification toggle
  const handleNotificationToggle = (field: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle security toggle
  const handleSecurityToggle = (field: keyof SecuritySettings) => {
    setSecuritySettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Bạn tự implement các function này
  const saveProfile = () => {
    // TODO: Save profile changes
    console.log('saveProfile - implement yourself', profileForm);
  };

  const saveNotifications = () => {
    // TODO: Save notification settings
    console.log('saveNotifications - implement yourself', notificationSettings);
  };

  const saveAppearance = () => {
    // TODO: Save appearance settings
    console.log('saveAppearance - implement yourself', { themeMode, sidebarCollapsed, compactView });
  };

  const changePassword = () => {
    // TODO: Change password
    console.log('changePassword - implement yourself', passwordForm);
  };

  const toggleTwoFactor = () => {
    // TODO: Enable/disable 2FA
    console.log('toggleTwoFactor - implement yourself');
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          Cài đặt
        </h1>
        <p className="text-gray-500 mt-1">Quản lý thông tin tài khoản và tùy chỉnh giao diện</p>
      </div>

      {/* Message Toast */}
      {message && (
        <div className={clsx(
          'mb-4 p-4 rounded-lg flex items-center justify-between',
          message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        )}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
          <button onClick={clearMessage} className="hover:opacity-70">
            <ChevronRight className="w-4 h-4 rotate-90" />
          </button>
        </div>
      )}

      {/* Settings Container */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-gray-50">
            <nav className="p-4 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={clsx(
                      'flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Thông tin cá nhân
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Cập nhật thông tin hồ sơ của bạn</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => handleProfileChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Công ty
                    </label>
                    <input
                      type="text"
                      value={profileForm.company}
                      onChange={(e) => handleProfileChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Tên công ty"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={(e) => handleProfileChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Địa chỉ liên hệ"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giới thiệu
                    </label>
                    <textarea
                      rows={3}
                      value={profileForm.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      placeholder="Đôi nét về bạn..."
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={saveProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Save className="w-4 h-4" />
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Cài đặt thông báo
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Chọn cách bạn muốn nhận thông báo</p>
                </div>

                <div className="space-y-4">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Email thông báo</p>
                      <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('emailNotifications')}
                      className={clsx(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                      )}
                    >
                      <span className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </div>

                  {/* Push Notifications */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Thông báo đẩy</p>
                      <p className="text-sm text-gray-500">Nhận thông báo trên trình duyệt</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('pushNotifications')}
                      className={clsx(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        notificationSettings.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                      )}
                    >
                      <span className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </div>

                  {/* Order Updates */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Cập nhật đơn hàng</p>
                      <p className="text-sm text-gray-500">Thông báo khi có đơn hàng mới hoặc cập nhật</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('orderUpdates')}
                      className={clsx(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        notificationSettings.orderUpdates ? 'bg-blue-600' : 'bg-gray-300'
                      )}
                    >
                      <span className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        notificationSettings.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </div>

                  {/* Product Alerts */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Cảnh báo tồn kho</p>
                      <p className="text-sm text-gray-500">Thông báo khi sản phẩm sắp hết hàng</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('productAlerts')}
                      className={clsx(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        notificationSettings.productAlerts ? 'bg-blue-600' : 'bg-gray-300'
                      )}
                    >
                      <span className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        notificationSettings.productAlerts ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </div>

                  {/* Marketing Emails */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Email tiếp thị</p>
                      <p className="text-sm text-gray-500">Nhận tin tức khuyến mãi và cập nhật sản phẩm</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('marketingEmails')}
                      className={clsx(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        notificationSettings.marketingEmails ? 'bg-blue-600' : 'bg-gray-300'
                      )}
                    >
                      <span className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        notificationSettings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </div>

                  {/* Weekly Digest */}
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Bản tin hàng tuần</p>
                      <p className="text-sm text-gray-500">Tổng hợp hoạt động trong tuần qua</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('weeklyDigest')}
                      className={clsx(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        notificationSettings.weeklyDigest ? 'bg-blue-600' : 'bg-gray-300'
                      )}
                    >
                      <span className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        notificationSettings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={saveNotifications}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Save className="w-4 h-4" />
                    Lưu cài đặt
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-blue-600" />
                    Tùy chỉnh giao diện
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Thay đổi giao diện hiển thị của dashboard</p>
                </div>

                {/* Theme Mode Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Chế độ màu</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { mode: 'light', label: 'Sáng', icon: Sun, bg: 'bg-white', border: 'border-gray-200' },
                      { mode: 'dark', label: 'Tối', icon: Moon, bg: 'bg-gray-900', border: 'border-gray-700' },
                      { mode: 'system', label: 'Hệ thống', icon: Laptop, bg: 'bg-gray-100', border: 'border-gray-300' }
                    ].map((option) => {
                      const Icon = option.icon;
                      const isSelected = themeMode === option.mode;
                      return (
                        <button
                          key={option.mode}
                          onClick={() => setThemeMode(option.mode as ThemeMode)}
                          className={clsx(
                            'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all',
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          )}
                        >
                          <div className={clsx('p-2 rounded-full', option.bg)}>
                            <Icon className={clsx('w-5 h-5', option.mode === 'dark' ? 'text-white' : 'text-gray-700')} />
                          </div>
                          <span className="text-sm font-medium">{option.label}</span>
                          {isSelected && <CheckCircle className="w-4 h-4 text-blue-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sidebar Preference */}
                <div className="flex items-center justify-between py-3 border-t pt-4">
                  <div>
                    <p className="font-medium text-gray-900">Thu gọn Sidebar</p>
                    <p className="text-sm text-gray-500">Thu gọn thanh điều hướng bên trái</p>
                  </div>
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className={clsx(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      sidebarCollapsed ? 'bg-blue-600' : 'bg-gray-300'
                    )}
                  >
                    <span className={clsx(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      sidebarCollapsed ? 'translate-x-6' : 'translate-x-1'
                    )} />
                  </button>
                </div>

                {/* Compact View */}
                <div className="flex items-center justify-between py-3 border-t">
                  <div>
                    <p className="font-medium text-gray-900">Chế độ xem gọn</p>
                    <p className="text-sm text-gray-500">Hiển thị nhiều thông tin hơn trên mỗi màn hình</p>
                  </div>
                  <button
                    onClick={() => setCompactView(!compactView)}
                    className={clsx(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      compactView ? 'bg-blue-600' : 'bg-gray-300'
                    )}
                  >
                    <span className={clsx(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      compactView ? 'translate-x-6' : 'translate-x-1'
                    )} />
                  </button>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={saveAppearance}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Save className="w-4 h-4" />
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Bảo mật tài khoản
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Quản lý cài đặt bảo mật cho tài khoản của bạn</p>
                </div>

                {/* Change Password Section */}
                <div className="space-y-4 border-b pb-6">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Đổi mật khẩu
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu hiện tại
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                        placeholder="Nhập mật khẩu mới"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Xác nhận mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={changePassword}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Đổi mật khẩu
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Xác thực hai yếu tố (2FA)</p>
                    <p className="text-sm text-gray-500">Tăng cường bảo mật với xác thực hai lớp</p>
                  </div>
                  <button
                    onClick={toggleTwoFactor}
                    className={clsx(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      securitySettings.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    )}
                  >
                    <span className={clsx(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    )} />
                  </button>
                </div>

                {/* Session Timeout */}
                <div className="py-3 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Thời gian chờ phiên</p>
                      <p className="text-sm text-gray-500">Tự động đăng xuất sau thời gian không hoạt động</p>
                    </div>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="15">15 phút</option>
                      <option value="30">30 phút</option>
                      <option value="60">1 giờ</option>
                      <option value="120">2 giờ</option>
                    </select>
                  </div>
                </div>

                {/* Login Alerts */}
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Cảnh báo đăng nhập</p>
                    <p className="text-sm text-gray-500">Nhận email khi có đăng nhập từ thiết bị mới</p>
                  </div>
                  <button
                    onClick={() => handleSecurityToggle('loginAlerts')}
                    className={clsx(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      securitySettings.loginAlerts ? 'bg-blue-600' : 'bg-gray-300'
                    )}
                  >
                    <span className={clsx(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      securitySettings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                    )} />
                  </button>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={saveNotifications}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Save className="w-4 h-4" />
                    Lưu cài đặt
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
