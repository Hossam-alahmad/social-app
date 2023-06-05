import React from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Skeleton,
    Stack,
} from "@chakra-ui/react";

const Index = ({ button, isLoading, children }) => {
    return (
        <Menu>
            <MenuButton as={"button"} className="w-full">
                {button}
            </MenuButton>
            <MenuList className="bg-white p-4 min-w-[200px] shadow-md rouned-sm dark:bg-secondry-dark">
                {isLoading ? (
                    <Stack>
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                    </Stack>
                ) : (
                    children
                )}
            </MenuList>
        </Menu>
    );
};

export default Index;
