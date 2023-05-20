import StatisticCard from "../components/Card";
import {
	faBuildingCircleCheck,
	faMinusSquare,
	faPlusSquare,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = (props) => {
	const { departmentList, employeeList } = props;

	const { employees } = employeeList;
	const { departments } = departmentList;

	return (
		employees &&
		departments && (
			<div className="container my-1">
				<p
					style={{ fontSize: "24px", backgroundColor: "#f8f8f8" }}
					className="p-3 border rounded mb-4"
				>
					Welcome to the Board of Intermediate and Secondary Education Payroll
					Dashboard! 😍
				</p>
				<div className="d-flex justify-content-between flex-wrap align-item-center">
					<StatisticCard
						message="Total Employees"
						value={employees.length}
						icon={faUsers}
						bgColor={"#007bff"}
					/>
					<StatisticCard
						message="Total Sections"
						value={departments.length}
						icon={faBuildingCircleCheck}
						bgColor={"#06b6d4"}
					/>
					<StatisticCard
						message="Total Allowances"
						value={802324}
						icon={faPlusSquare}
						bgColor={"#22c55e"}
					/>
					<StatisticCard
						message="Total Deductions"
						value={988392}
						icon={faMinusSquare}
						bgColor={"#f43f5e"}
					/>
				</div>
			</div>
		)
	);
};

export default Dashboard;
