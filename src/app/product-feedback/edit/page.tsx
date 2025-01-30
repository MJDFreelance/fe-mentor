import {EditPage} from "@/app/product-feedback/components/EditPage";

const Page = ({params}:any) => {
    return (
        <>
            <EditPage id={isNaN(params.id)?-1:params.id} />
        </>
    )
};

export default Page;