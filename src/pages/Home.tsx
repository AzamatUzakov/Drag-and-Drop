import { Column } from "@/components/custom/Column";
import { ReloadCTX } from "@/contexts/reload";
import { ColumnType } from "@/types";
import React, { useEffect, useState } from "react";

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
	const [columns, setColumns] = useState<ColumnType[]>([]);
	const [reload, setReload] = useState(true);

	useEffect(() => {
		fetch("http://localhost:8080/columns")
			.then((res) => res.json())
			.then((res) => setColumns(res));
	}, []);

	return (

		<ReloadCTX.Provider value={[reload, setReload]}>
			<section className="flex items-start justify-start gap-6">
				{columns.map((column) => (
					<Column
						key={column.id}
						title={column.title}
						id={column.id}
					/>
				))}
			</section>
		</ReloadCTX.Provider>
	);
};

export default Home;
