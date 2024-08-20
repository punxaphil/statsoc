'use client';
import { Box, Button, Center, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { categories } from '@/app/const';
import { useSearchParams } from 'next/navigation';
import { fetchPlayerStatistics, savePlayerStatistics } from '@/app/lib/sqlite';
import { Category, Statistic } from '@/app/types';
import { FaUsersGear } from 'react-icons/fa6';

export default function Page() {
  let prevCategory = '';
  const [selectedName, setSelectedName] = useState('');

  function Categories() {
    const searchParams = useSearchParams();
    const player = searchParams.get('player');
    if (player) {
      setSelectedName(player);
    }
    const [stats, setStats] = useState<Statistic[]>([]);

    useEffect(loadStats, []);

    function loadStats() {
      fetchPlayerStatistics(selectedName).then(setStats);
    }

    async function stepStatistic(category: Category, number: number) {
      await savePlayerStatistics(selectedName, category.name, number);
      loadStats();
    }

    return (
      <>
        {categories.map((category) => {
          const find = stats.find((stat) => stat.description === category.name);
          const number = find ? find.count : 0;
          const element = (
            <Box key={category.name}>
              {category.type !== prevCategory ? (
                <Heading size='sm' mt='3' mb='1'>
                  {category.type}
                </Heading>
              ) : (
                ''
              )}
              <Flex align='center' gap='1'>
                <Text flex='1'>{number}</Text>
                <Button flex='1' colorScheme='red' onClick={async () => await stepStatistic(category, number - 1)} isDisabled={number === 0}>
                  -
                </Button>
                <Button flex='1' colorScheme='green' onClick={async () => await stepStatistic(category, number + 1)}>
                  +
                </Button>
                <Text flex='12'>{category.name}</Text>
              </Flex>
            </Box>
          );
          prevCategory = category.type;
          return element;
        })}
      </>
    );
  }

  return (
    <>
      <Center>
        <Heading>
          <Link href={`/players?player=${selectedName}`}>
            <Center>
              StatSoc - {selectedName}
              <Icon as={FaUsersGear} boxSize='5' m='3' />
            </Center>
          </Link>
        </Heading>
      </Center>

      <Flex justify='space-evenly' m='3' direction={'column'} gap='1'>
        <Suspense>
          <Categories />
        </Suspense>
      </Flex>
    </>
  );
}
