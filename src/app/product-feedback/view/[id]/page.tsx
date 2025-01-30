import {ViewPage} from "@/app/product-feedback/components/ViewPage";
import data from "@/app/product-feedback/data.json";

const Page = ({params}:any) => {
    return (
        <>
            <ViewPage id={isNaN(params.id)?-1:params.id} user={data.currentUser} />
        </>
    )
};

export default Page;