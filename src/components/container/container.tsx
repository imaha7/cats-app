import React, { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classNames from "classnames";
import classes from "./container.module.scss";
import { Scrollbars } from "react-custom-scrollbars-2";

interface ContainerProps extends ComponentPropsWithoutRef<"main"> {
	children: ReactNode;
	page?: number;
	options?: any;
	setOptions?: React.Dispatch<React.SetStateAction<any>> | any;
	paginationLimit?: number | any;
}

const renderThumb = ({ style, ...props }: ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			className="bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50"
			style={{
				borderRadius: "5px",
				...style,
			}}
			{...props}
		/>
	);
};

const renderTrackHorizontal = ({
	style,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			style={{
				display: "none",
				...style,
			}}
			{...props}
		/>
	);
};

const handleScroll = (e: any, page: number, options: any, setOptions: React.Dispatch<React.SetStateAction<any>>, paginationLimit: number) => {
	const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
	if (bottom && page < paginationLimit) {
		setOptions({ ...options, limit: options.limit + 10 });
	}
}

const Container: FC<ContainerProps> = ({ children, page = 0, options, setOptions, paginationLimit, ...props }) => {
	const containerClasses = classNames({
		[classes.container]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<main className={containerClasses} {...props}>
			<Scrollbars
				renderThumbVertical={renderThumb}
				renderTrackHorizontal={renderTrackHorizontal}
				universal
				onScroll={(e: any) => handleScroll(e, page, options, setOptions, paginationLimit)}
			>
				{children}
			</Scrollbars>
		</main>
	);
};

export default Container;
