import { OrgControl } from "./components/OrgControl"


const OrganizationIdLayout = ({
    children
} : { 
    children: React.ReactNode
}) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}

export default OrganizationIdLayout