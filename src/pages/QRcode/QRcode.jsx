import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import "./QRcode.css";

const QRCodeAttendance = () => {
  const [qrValue, setQrValue] = useState("");
  const [scannedUsers, setScannedUsers] = useState([]);
  const [pendingConfirmation, setPendingConfirmation] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Mock student data - replace with actual data
  const students = {
    student1: "John Doe",
    student2: "Jane Smith",
  };

  // Validate location is within acceptable range (e.g., 100 meters from class)
  const isLocationValid = (userLoc) => {
    // Example classroom coordinates
    const classroomLat = 34.0522;
    const classroomLng = -118.2437;

    const distance = calculateDistance(
      userLoc.latitude,
      userLoc.longitude,
      classroomLat,
      classroomLng
    );

    return distance <= 0.1; // 100 meters in kilometers
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const generateQRValue = () => {
    return Math.random().toString(36).substring(2, 12);
  };

  useEffect(() => {
    // Get initial location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          setLocationError("Unable to retrieve location: " + error.message);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }

    // QR code refresh interval
    setQrValue(generateQRValue());
    const interval = setInterval(() => {
      setQrValue(generateQRValue());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleScan = (studentId) => {
    if (!location) {
      alert("Please enable location services to confirm attendance");
      return;
    }

    if (!isLocationValid(location)) {
      alert(
        "You must be within 100 meters of the classroom to confirm attendance"
      );
      return;
    }

    if (studentId && students[studentId]) {
      setPendingConfirmation({
        id: studentId,
        name: students[studentId],
        time: new Date().toLocaleTimeString(),
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
    }
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed && pendingConfirmation) {
      setScannedUsers((prev) => [pendingConfirmation, ...prev]);
    }
    setPendingConfirmation(null);
  };

  return (
    <div className="attendance-container">
      {locationError && <div className="error-banner">{locationError}</div>}

      <div className="qr-section">
        <h2>Attendance QR Code</h2>
        <div className="qr-wrapper">
          <QRCode value={qrValue} size={256} />
        </div>
        <p className="refresh-text">Code refreshes every 10 seconds</p>
        {location && (
          <p className="location-status">
            Location verified: {location.latitude.toFixed(4)},{" "}
            {location.longitude.toFixed(4)}
          </p>
        )}
      </div>

      <div className="attendance-log">
        <h2>Confirmed Attendees</h2>
        <div className="log-container">
          {scannedUsers.length === 0 ? (
            <p className="no-scans">No attendees confirmed yet</p>
          ) : (
            <div className="scan-list">
              {scannedUsers.map((scan) => (
                <div key={scan.id} className="scan-item">
                  <span className="scan-name">{scan.name}</span>
                  <span className="scan-time">{scan.time}</span>
                  <span className="scan-location">
                    ({scan.location.latitude.toFixed(4)},{" "}
                    {scan.location.longitude.toFixed(4)})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {pendingConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <p>Is this you?</p>
            <p className="student-name">{pendingConfirmation.name}</p>
            <div className="confirmation-buttons">
              <button onClick={() => handleConfirmation(true)}>Yes</button>
              <button onClick={() => handleConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeAttendance;
