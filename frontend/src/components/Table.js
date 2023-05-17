import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	table: {
		display: "table",
		width: "auto",
		marginTop: 10,
		marginBottom: 10,
		fontSize: 10,
	},
	tableRow: {
		flexDirection: "row",
	},
	tableColHeader: {
		width: "30%",
		backgroundColor: "#f0f0f0",
		padding: 5,
		fontWeight: "bold",
		border: "1pt solid #ccc",
	},
	tableCol: {
		width: "70%",
		padding: 5,
		border: "1pt solid #ccc",
	},
});

const Table = ({ data }) => {
	return (
		<View style={styles.table}>
			{data.map((row, index) => (
				<View key={index} style={styles.tableRow}>
					<Text style={styles.tableColHeader}>{row.label}</Text>
					<Text style={styles.tableCol}>{row.value}</Text>
				</View>
			))}
		</View>
	);
};

export default Table;
