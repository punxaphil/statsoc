'use client';
import { Button, Flex, FormControl, FormLabel, Heading, Input, Spinner, useToast } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { deletePlayer, fetchPlayersFromDb, savePlayer } from '@/app/lib/db';
import { Player } from '@/app/types';
import { colors } from '@/app/const';
import { FaRegTrashCan } from 'react-icons/fa6';

function getHeading(text: string, mt = 10) {
  return (
    <Heading size='md' m='3' mt={mt}>
      {text}
    </Heading>
  );
}

export default function Page() {
  const searchParams = useSearchParams();
  const selectedPlayer = searchParams.get('player');

  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [deleteMode, setDeleteMode] = useState<Boolean>(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  function loadPlayers() {
    fetchPlayersFromDb()
      .then(setPlayers)
      .then(() => setLoading(false));
  }

  useEffect(loadPlayers, []);
  const [newPlayer, setNewPlayer] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewPlayer(event.target.value);
  return (
    <>
      <Flex direction='column' align='center'>
        {getHeading('Välj spelare', 3)}
        {loading ? (
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
        ) : (
          <>
            <Flex wrap='wrap'>
              {players.map((player, index) => (
                <Button
                  variant={player.name === selectedPlayer ? 'outline' : 'solid'}
                  key={player.name}
                  m='2'
                  onClick={() => {
                    if (deleteMode) {
                      toast.promise(deletePlayer(player.name), {
                        success: () => {
                          loadPlayers();
                          return {
                            title: 'Spelaren raderad!',
                          };
                        },
                        error: (err) => {
                          return {
                            title: 'Spelaren raderades inte',
                            description: err.message,
                          };
                        },
                        loading: { title: 'Raderas...' },
                      });
                    } else {
                      router.push(`/?player=${player.name}`);
                    }
                  }}
                  colorScheme={colors[index % colors.length]}
                  rightIcon={deleteMode ? <FaRegTrashCan /> : undefined}>
                  {player.name}
                </Button>
              ))}
            </Flex>
            {getHeading('Skapa ny spelare')}
            <form
              action={() => {
                toast.promise(savePlayer(newPlayer), {
                  success: () => {
                    setNewPlayer('');
                    loadPlayers();
                    return {
                      title: 'Sparad!',
                    };
                  },
                  error: (err) => {
                    return {
                      title: 'Spelaren sparades inte',
                      description: err.message,
                    };
                  },
                  loading: { title: 'Sparas...' },
                });
              }}>
              <FormControl isRequired>
                <FormLabel>Namn</FormLabel>
                <Input name='name' type='text' value={newPlayer} placeholder='spelarens namn' size='lg' onChange={handleChange} />
              </FormControl>
              <Button variant='outline' type='submit' width='full' mt={4}>
                Spara
              </Button>
            </form>

            {getHeading('Ta bort spelare')}
            <Button colorScheme='red' onClick={() => setDeleteMode(!deleteMode)}>
              {deleteMode ? 'Klar' : 'Välj spelare...'}
            </Button>
          </>
        )}
      </Flex>
    </>
  );
}
