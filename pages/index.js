import Head from 'next/head';
import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Container,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
} from '@chakra-ui/react';

import PasswordGenerator from "../components/passwordGenerator";
import PasswordAnalyzer from "../components/passwordAnalyzer";

export default function Home() {
  return (
      <div>
        <Head>
          <title>Password Generator and Analyzer | Kreative</title>
          <meta name="description" content="Password generator and analyzer by Kreative" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Box mt="50px">
            <Center height="50px">
              <Image src="/Kreative_Logo_v3.png" width={100} height={50} />
            </Center>
            <Center height="50px">
              <Heading>Password Generator and Analyzer</Heading>
            </Center>
          </Box>
          <Container mt="50px">
            <Tabs isFitted variant='enclosed' colorScheme={"purple"}>
              <TabList mb='1em'>
                <Tab>Generator</Tab>
                <Tab>Analyzer</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <PasswordGenerator />
                </TabPanel>
                <TabPanel>
                  <PasswordAnalyzer />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
        </main>
      </div>
  )
}
