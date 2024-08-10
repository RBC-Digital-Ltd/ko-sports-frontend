import { useState } from "react";

import cx from "clsx";

import {
  Container,
  Group,
  Burger,
  Menu,
  UnstyledButton,
  Avatar,
  Text,
  rem,
  Drawer,
  ScrollArea,
  Divider,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconChevronDown, IconHeart } from "@tabler/icons-react";

import { Form, Link } from "@remix-run/react";

import type { User } from "~/utils/auth.server";

import classes from "./index.module.css";

type NavigationProps = {
  user: User | null;
};

const links = [{ title: "Home", to: "/" }];

export default function Navigation({ user }: NavigationProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = links.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {link.title}
    </Link>
  ));
  return (
    <>
      <header className={classes.header}>
        <Container size="xl" className={classes.inner}>
          <Group visibleFrom="xs">
            <Text>KO Sports</Text>
            {items}
          </Group>

          <Group gap={5} visibleFrom="xs">
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={user?.profile.photos![0].value}
                      alt={user?.profile.displayName}
                      radius="xl"
                      size={20}
                    />
                    <Text className={classes.userName} size="sm">
                      {user?.profile.displayName}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconHeart
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Liked posts
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </header>
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {items}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
