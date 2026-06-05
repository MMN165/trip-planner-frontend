import { useState, useEffect } from "react";
import { Box, TextField, Typography, Avatar, Button, Divider } from "@mui/material";
import { PURPLE_DARK, PURPLE } from "../../constants";
import API from "../../api";

function ManageAccount({ profile }) {
    const travelerProfile = JSON.parse(localStorage.getItem("travelerProfile")) || {};

    const [image, setImage] = useState(null);


    const [editingAccount, setEditingAccount] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [form, setForm] = useState({

        name: travelerProfile.name || "",
		email: travelerProfile.email || "",
		// password: travelerProfile.password, 
        username: travelerProfile.username || ""
		});


	const handleChange = (e) => {
	setForm({ ...form, [e.target.name]: e.target.value });
	};


    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) setImage(savedImage);



        // setName(travelerProfile?.name || "");
        // setUsername(travelerProfile?.username || "");
        // setEmail(travelerProfile?.email || "");
        // // setPhone(travelerProfile?.meta?.phone || "");
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            localStorage.setItem("profileImage", reader.result);
        };
        reader.readAsDataURL(file);
    };
  

    const handlePasswordUpdate = async () => {
        // Check passwords match
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match!");
            return;
        }

        try {
            const profile = JSON.parse(localStorage.getItem("travelerProfile"));

            await API.put(`/users/${profile.id}/password`, {
                currentPassword: currentPassword,
                newPassword: newPassword,
            });

            console.log("Password updated!");
            setEditingPassword(false);
            setPasswordError("");
        } catch (err) {
            console.error("Error:", err.response?.data);
            setPasswordError("Current password is incorrect!");
        }
    };
    const handleUpdate = async () => {
        try {
            const profile = JSON.parse(localStorage.getItem("travelerProfile"));



            
            const response = await API.put(`/users/${profile.id}`, {
                name: form.name,
                username: form.username,
                email: form.email,
                // password: profile.password
                // phone: phone,
            });
            console.log("3. Response:", response.data);
            profile.name = form.name;
            profile.username = form.username;
            profile.email = form.email;
            // profile.password = form.password;
            
            localStorage.setItem("travelerProfile", JSON.stringify(profile));

            console.log("Saved successfully!");
            setEditingAccount(false);
        } catch (err) {
            console.error("Full error:", err);           // ← full error
            console.error("Status:", err.response?.status); // ← status code
            console.error("Data:", err.response?.data);     // ← response data
            console.error("Message:", err.message);      
        }
    };
    const handleDeleteAccount = async () => {
        console.log("Attempting to delete account...");
        const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirm) return;

        try {
            const profile = JSON.parse(localStorage.getItem("travelerProfile"));
            console.log("Deleting account for user ID:", profile?.id);

            await API.delete(`/users/${profile.id}`);
            localStorage.removeItem("travelerProfile");
            localStorage.removeItem("profileImage");
            localStorage.removeItem("user");

            console.log("Account deleted!");
            window.location.href = "/";

        } catch (err) {
            console.error("Delete error status:", err.response?.status);
            console.error("Delete error data:", err.response?.data);
            alert("Error: " + err.response?.status);
        }
        
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

            {/* Title */}
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#000" }}>
                Manage Account
            </Typography>

            {/* Profile Picture */}
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: PURPLE_DARK, mb: 2 }}>
                    Profile Picture
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Avatar
                        src={image}
                        sx={{ width: 80, height: 80, fontSize: "32px", bgcolor: PURPLE }}
                    >
                        {!image && form.name?.charAt(0)}
                    </Avatar>
                    <Box>
                        <input
                            type="file"
                            accept="image/*"
                            id="upload-photo"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="upload-photo">
                            <Button
                                variant="contained"
                                component="span"
                                sx={{ mr: 1, backgroundColor: PURPLE, color: "#fff" }}
                            >
                                Upload Photo
                            </Button>
                        </label>
                        {image && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setImage(null);
                                    localStorage.removeItem("profileImage");
                                }}
                            >
                                Remove
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>

            <Divider />

            {/* Account Information */}
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: PURPLE_DARK }}>
                        Account Information
                    </Typography>
                    {!editingAccount && (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setEditingAccount(true)}
                            sx={{ color: PURPLE_DARK, borderColor: PURPLE_DARK }}
                        >
                            Edit Account
                        </Button>
                    )}
                </Box>

                {/* Display Mode */}
                {!editingAccount ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Typography sx={{ color: "#666", minWidth: "100px" }}>Full Name</Typography>
                            <Typography sx={{ color: "#000", fontWeight: 500 }}>{form.name || "—"}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Typography sx={{ color: "#666", minWidth: "100px" }}>Username</Typography>
                            <Typography sx={{ color: "#000", fontWeight: 500 }}>{form.username || "—"}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Typography sx={{ color: "#666", minWidth: "100px" }}>Email</Typography>
                            <Typography sx={{ color: "#000", fontWeight: 500 }}>{form.email || "—"}</Typography>
                        </Box>
                        {/* <Box sx={{ display: "flex", gap: 1 }}>
                            <Typography sx={{ color: "#666", minWidth: "100px" }}>Phone</Typography>
                            <Typography sx={{ color: "#000", fontWeight: 500 }}>{phone || "—"}</Typography>
                        </Box> */}
                    </Box>
                ) : (
                    /* Edit Mode */
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            name="name"
                            label="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            name="username"
                            label="Username"
                            value={form.username}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />
                        {/* <TextField
                            label="Phone"
                            value={phone}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        /> */}
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: PURPLE, color: "#fff" }}
                                onClick={handleUpdate}
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setEditingAccount(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>

            <Divider />

            {/* Change Password */}
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: PURPLE_DARK }}>
                        Change Password
                    </Typography>
                    {!editingPassword && (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setEditingPassword(true)}
                            sx={{ color: PURPLE_DARK, borderColor: PURPLE_DARK }}
                        >
                            Edit Password
                        </Button>
                    )}
                </Box>

                {!editingPassword ? (
                    <Typography sx={{ color: "#666" }}>
                        ●●●●●●●●
                    </Typography>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {passwordError && (
                            <Typography sx={{ color: "red", fontSize: "14px" }}>
                                {passwordError}
                            </Typography>
                        )}
                        <TextField
                            label="Current Password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Confirm New Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            size="small"
                        />
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: PURPLE, color: "#fff" }}
                                onClick={handlePasswordUpdate}
                            >
                                Update Password
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setEditingPassword(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>

            <Divider />

            {/* Delete Account */}
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#d32f2f", mb: 1 }}>
                    Delete Account
                </Typography>
                <Button variant="outlined" color="error" onClick={handleDeleteAccount}>
                    Delete Account
                </Button>
            </Box>
        </Box>
    );
}

export default ManageAccount;