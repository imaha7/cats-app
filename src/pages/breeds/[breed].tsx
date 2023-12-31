import React from "react";
import { NextPage } from "next";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import Tag from "../../components/tag/tag";
import { useQuery } from "@tanstack/react-query";
import { getImageResponse, ImageService } from "../../service/image.service";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "../../components/ui/loader/loader";
import UserLogItem from "../../components/userLog/userLogItem";

const Breed: NextPage<{ breed: string }> = ({ breed }) => {
	const [isExpand, setIsExpand] = React.useState<boolean>(false);
	const { data, isLoading, isFetching } = useQuery<
		getImageResponse[],
		any,
		getImageResponse[],
		any
	>({
		queryKey: ["breed", breed],
		queryFn: () =>
			ImageService.getImages(
				{
					limit: 5,
					has_breeds: 1,
					breed_ids: breed,
				},
				"data"
			),
	});

	return (
		<Container>
			<ContainerHeader
				className="flex-wrap"
				title="breeds"
				titleVariant="primarySoft"
			>
				<Tag>{breed}</Tag>
			</ContainerHeader>

			{isLoading || isFetching ? (
				<Loader centered />
			) : data?.length ? (
				<>
					<Carousel
						swipeable
						emulateTouch
						showStatus={false}
						showArrows={false}
						showThumbs={false}
					>
						{data?.map((item) => (
							<div
								className="relative overflow-hidden h-[360px] max-w-full rounded-[20px] sm:h-[160px]"
								key={item.id}
							>
								<Image
									src={item.url}
									placeholder="blur"
									blurDataURL={item.url}
									layout="fill"
									alt={item.breeds![0].name}
								/>
							</div>
						))}
					</Carousel>

					<div className="mt-[56px] pt-[20px] px-[40px] pb-[40px] relative border-2 border-primary-soft rounded-[20px] dark:border-primary-dark">
						<div className="absolute top-[-15px] right-2/4 translate-x-2/4 inline-block px-[20px] rounded-[20px] bg-white text-[20px] font-medium whitespace-nowrap dark:bg-black-soft">
							{data[0].breeds![0].name}
						</div>
						<div className="text-center text-[20px] text-gray-dark">
							{data[0].breeds![0].description}
						</div>
						<div data-te-collapse-item className={`"w-full ${isExpand ? "flex" : "hidden"} justify-between gap-[20px] mt-[20px] sm:flex-wrap sm:gap-[10px]"`}>
							<div className="w-full">
								<span className="font-medium">
									Temperament:
								</span>{" "}
								<span className="text-gray-dark">
									{data[0].breeds![0].temperament}
								</span>
							</div>
							<div className="w-full flex flex-col gap-[10px]">
								<div>
									<span className="font-medium">Origin:</span>{" "}
									<span className="text-gray-dark">
										{data[0].breeds![0].origin}
									</span>
								</div>
								<div>
									<span className="font-medium">Weight:</span>{" "}
									<span className="text-gray-dark">
										{data[0].breeds![0].weight.metric} kgs
									</span>
								</div>
								<div>
									<span className="font-medium">
										Life span:
									</span>{" "}
									<span className="text-gray-dark">
										{data[0].breeds![0].life_span} years
									</span>
								</div>
							</div>
						</div>
						<div className="text-right mt-10">
							<a
								className={`"inline-block rounded-lg bg-primary px-6 py-2 text-xs text-center font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"`}
								role="button"
								onClick={() => setIsExpand(!isExpand)}>
								{isExpand ? 'Show Less' : "Show More"}
							</a>
						</div>
					</div>
				</>
			) : (
				<UserLogItem text="No item found" />
			)}
		</Container>
	);
};

Breed.getInitialProps = async ({ query }) => {
	const { breed } = query as { breed: string };

	return { breed };
};

export default Breed;
