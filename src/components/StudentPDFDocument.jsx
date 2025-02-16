import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#f3f4f6",
    padding: 5,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 25,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  achievement: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#f9fafb",
  },
  certification: {
    marginBottom: 10,
    padding: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
});

const StudentPDFDocument = ({
  student,
  department,
  batch,
  showActivities = false,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Academic Record</Text>
          <Text style={styles.subtitle}>
            {student.name} - {student.rollNo}
          </Text>
          <Text style={styles.subtitle}>
            {department} - {batch}
          </Text>
          <Text style={styles.subtitle}>CGPA: {student.cgpa}</Text>
          <Text style={styles.subtitle}>Overall Attendance: {student.attendance}</Text>
        </View>

        {!showActivities ? (
          // Academic Performance Section
          Object.entries(student.grades).map(([sem, data]) => (
            <View key={sem} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {sem.replace(/([A-Z])/g, " $1").trim()} - GPA: {data.gpa}
              </Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCell}>Subject</Text>
                  <Text style={styles.tableCell}>Credits</Text>
                  <Text style={styles.tableCell}>Grade</Text>
                  <Text style={styles.tableCell}>Attendance</Text>
                </View>
                {data.subjects.map((subject, idx) => (
                  <View key={idx} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{subject.name}</Text>
                    <Text style={styles.tableCell}>{subject.credits}</Text>
                    <Text style={styles.tableCell}>{subject.grade}</Text>
                    <Text style={styles.tableCell}>{subject.attendance}%</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          // Activities Section
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Academic Achievements</Text>
              {student.activities.academic.map((activity, index) => (
                <View key={index} style={styles.achievement}>
                  <Text style={styles.text}>{activity.title}</Text>
                  {activity.position && (
                    <Text style={styles.text}>
                      Position: {activity.position}
                    </Text>
                  )}
                  <Text style={styles.text}>{activity.description}</Text>
                  <Text style={styles.text}>
                    Date: {new Date(activity.date).toLocaleDateString()}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {student.activities.certifications.map((cert, index) => (
                <View key={index} style={styles.certification}>
                  <Text style={styles.text}>{cert.name}</Text>
                  <Text style={styles.text}>Issuer: {cert.issuer}</Text>
                  <Text style={styles.text}>
                    Issued: {new Date(cert.date).toLocaleDateString()}
                  </Text>
                  {cert.validUntil && (
                    <Text style={styles.text}>
                      Valid until:{" "}
                      {new Date(cert.validUntil).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};

export default StudentPDFDocument;
