import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"

interface Props {
    baseRoute:string
    activeAccountType: string
}

const BreadCrubHeader = (props: Props) => {
    const {activeAccountType,baseRoute} = props
  return (
    <Breadcrumb>
    <BreadcrumbList>
        <BreadcrumbItem>
            <BreadcrumbLink href="#">Accounts</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbLink href="#">{baseRoute}</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbLink href="#">{activeAccountType}</BreadcrumbLink>
        </BreadcrumbItem>

    </BreadcrumbList>
</Breadcrumb>
  )
}

export default BreadCrubHeader