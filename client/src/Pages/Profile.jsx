import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { 
  User, Mail, Shield, Camera, Save, ArrowLeft, 
  CheckCircle, XCircle, Upload, Trash2, Edit2,
  Globe, Calendar, Loader2
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    bio: "",
    location: "",
    website: ""
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setFormData({
        name: res.data.name || "",
        avatar: res.data.avatar || "",
        bio: res.data.bio || "",
        location: res.data.location || "",
        website: res.data.website || ""
      });
      setAvatarPreview(res.data.avatar || "");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateUrl = (url) => {
    if (!url) return true;
    const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return pattern.test(url);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploadingAvatar(true);
    const uploadFormData = new FormData();
    uploadFormData.append('avatar', file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/user/upload-avatar",
        uploadFormData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setFormData(prev => ({ ...prev, avatar: res.data.avatar }));
      toast.success("Avatar updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload avatar");
      setAvatarPreview(formData.avatar);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const removeAvatar = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/user/avatar", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData(prev => ({ ...prev, avatar: "" }));
      setAvatarPreview("");
      toast.success("Avatar removed");
    } catch (err) {
      toast.error("Failed to remove avatar");
    }
  };

  const updateProfile = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (formData.name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    if (formData.website && !validateUrl(formData.website)) {
      toast.error("Please enter a valid website URL");
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/user/me",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with back button */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <button 
              onClick={() => window.history.back()}
              className="mb-4 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-gray-500 mt-2">Manage your profile information and preferences</p>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          )}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Card - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
              <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-teal-500">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-white p-1">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt={formData.name}
                          className="w-full h-full rounded-full object-cover"
                          onError={() => setAvatarPreview("")}
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-3xl font-bold">
                          {getInitials(formData.name || "User")}
                        </div>
                      )}
                    </div>
                    
                    {isEditing && (
                      <>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingAvatar}
                          className="absolute bottom-0 right-0 p-2 bg-emerald-600 rounded-full text-white hover:bg-emerald-700 transition-all shadow-lg disabled:opacity-50"
                        >
                          {uploadingAvatar ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                        {formData.avatar && (
                          <button
                            onClick={removeAvatar}
                            className="absolute bottom-0 left-0 p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-all shadow-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-20 pb-6 px-6 text-center">
                <h2 className="text-xl font-bold text-gray-900">{formData.name || "Not set"}</h2>
                <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
                  <Mail size={14} />
                  {user?.email}
                </p>
                
                {formData.bio && (
                  <p className="text-gray-600 text-sm mt-3 italic">"{formData.bio}"</p>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  {formData.location && (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Globe size={14} />
                      <span>{formData.location}</span>
                    </div>
                  )}
                  {formData.website && (
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <a 
                        href={formData.website.startsWith('http') ? formData.website : `https://${formData.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 hover:underline"
                      >
                        {formData.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Auth Provider</span>
                  <span className="font-medium text-gray-900 flex items-center gap-1">
                    <Shield size={14} />
                    {user?.authProvider || "Email"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium text-gray-900 flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(user?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
              {isEditing ? (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Edit Profile Information</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Bio</label>
                      <textarea
                        name="bio"
                        rows="3"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us a little about yourself..."
                      />
                      <p className="text-xs text-gray-400 mt-1">Max 160 characters</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Location</label>
                        <input
                          name="location"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City, Country"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Website</label>
                        <input
                          name="website"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="pt-6 flex items-center gap-4">
                      <button
                        onClick={updateProfile}
                        disabled={isSaving}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={20} />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user?.name || "",
                            avatar: user?.avatar || "",
                            bio: user?.bio || "",
                            location: user?.location || "",
                            website: user?.website || ""
                          });
                          setAvatarPreview(user?.avatar || "");
                        }}
                        className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Information</h3>
                  <p className="text-gray-500 mb-6">Your profile information is up to date</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all shadow-sm"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;