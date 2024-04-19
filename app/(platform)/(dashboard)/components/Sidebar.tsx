"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, Organization } from "./NavItem";
import BugButton from "./BugButton";

interface SidebarProps {
  storageKey?: string;
}

const Sidebar = ({ storageKey = "c-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrganization } =
    useOrganization();

  // the useMemberships infinite true is a workaround for the issue where the userMemberships is not updated after the user leaves an organization
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  // This code block is creating a string array named 'defaultAccordionValue'.
  // It does this by getting all the keys from the 'expanded' object using 'Object.keys(expanded)'.
  // The second argument to 'reduce' function is an empty array [], which is used as the initial value for 'acc'.
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  // The function is used to update the state of 'expanded' object.
  // 'setExpanded' is a state setter function, typically from a useState hook in a React component.

  const onExpand = (id: string) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id],
    });
  };

  if (!isLoadedOrganization || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col 4xs:h-full sm:h-[89vh] justify-between">
      <div className="flex flex-col justify-start">
        <div className="font-medium text-xs flex items-center mb-1">
          <span className="pl-4">Workspaces</span>
          <Button asChild type="button" variant="ghost" className="ml-auto">
            <Link href="/select-org">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Accordion
          type="multiple"
          defaultValue={defaultAccordionValue}
          className="space-y-2"
        >
          {userMemberships.data.map((org) => (
            <NavItem
              key={org.id}
              isActive={activeOrganization?.id === org.organization.id}
              isExpanded={expanded[org.organization.id]}
              organization={org.organization as Organization}
              onExpand={onExpand}
            />
          ))}
        </Accordion>
      </div>
      <div className="flex">
        <BugButton/>
      </div>
    </div>
  );
};

export default Sidebar;
