import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

interface ReportItem {
  username: string;
  total_sessions: string;
  avg_duration_minutes: string;
}

export const generateReportPDF = async (
  reportData: ReportItem[],
  period: 'weekly' | 'monthly'
) => {
  const currentDate = new Date().toLocaleDateString();

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 24px;
            background-color: #ffffff;
            color: #333;
          }
          h1 {
            text-align: center;
            color: #2C3E50;
            font-size: 32px;
            margin-bottom: 5px;
          }
          h2 {
            text-align: center;
            color: #34495E;
            font-size: 22px;
            margin-top: 0;
          }
          p {
            text-align: center;
            font-size: 14px;
            color: #555;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
          }
          th, td {
            padding: 10px;
            border: 1px solid #ccc;
            text-align: left;
          }
          th {
            background-color: #2980B9;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>TheraAid</h1>
        <h2>User Engagement Report - ${period.toUpperCase()}</h2>
        <p>Date Generated: ${currentDate}</p>

        <table>
          <tr>
            <th>Username</th>
            <th>Total Sessions</th>
            <th>Avg Duration (min)</th>
          </tr>
          ${reportData.map(item => `
            <tr>
              <td>${item.username}</td>
              <td>${item.total_sessions}</td>
              <td>${item.avg_duration_minutes}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert('Sharing not available on this device');
    }
  } catch (err) {
    console.error('PDF generation error:', err);
    Alert.alert('Error', 'Failed to generate or share PDF');
  }
};
