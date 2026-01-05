import Hobby from '@/interfaces/hobby';
import { useRouter } from 'expo-router';
import React, {
  useCallback,
  useMemo,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Button,
  IconButton,
  Searchbar,
  Surface,
  Text,
  useTheme
} from 'react-native-paper';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { useSliceIds, useStore } from 'tinybase/ui-react';
import hobbiesData from '../assets/data/hobbies.json';

const { width } = Dimensions.get('window');
const GAP = 12;
const PADDING = 32;
const ITEM_WIDTH = (width - PADDING - GAP) / 2;

type HobbyItem = Hobby & { translatedName: string };

interface UserHobbiesScreenProps {
  callbackAction: 'navigate' | 'replace'
  callbackUrl: string
}

export default function UserHobbiesScreen({ 
  callbackAction, 
  callbackUrl 
}: UserHobbiesScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const store = useStore();
  const storedHobbies = useSliceIds('byHobbies');
  const isEditMode = !!storedHobbies.length;
  
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(
    !!storedHobbies.length ? storedHobbies : []
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Preparing list of hobbies with their key translated to UI language
  const preparedHobbies: HobbyItem[] = useMemo(() => {
    return hobbiesData.map((item) => ({
      ...item,
      translatedName: t(`views.userHobbies.hobbies.${item.key}`, 
        item.key.charAt(0).toUpperCase() + item.key.slice(1)
      )
    }));
  }, [t]);

  // Filtering hobbies based on user search query
  const filteredHobbies = useMemo(() => {
    if (!searchQuery) return preparedHobbies;

    const lowerQuery = searchQuery.toLowerCase();
    
    return preparedHobbies.filter((item) => 
      item.translatedName.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, preparedHobbies]);


  const toggleHobby = useCallback((key: string) => {
    setSelectedHobbies((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  }, []);
  
  const useScreenCallback = () => {
    if (callbackAction === 'navigate') {
      router.navigate(callbackUrl);
    } else if (callbackAction === 'replace') {
      router.replace(callbackUrl);
    }
  }

  const handleSave = () => {
    if (!store && !!selectedHobbies.length) return;
    const hobbiesToSave = selectedHobbies.map((key) => ({ 'key' : key }));
    const hobbiesIds = [...Array(hobbiesToSave.length).keys()]
    store?.setTable('hobbies', Object.fromEntries([hobbiesIds, hobbiesToSave]));
    useScreenCallback();
  };

  const handleSkip = () => {
    useScreenCallback();
  };

  const renderItem = ({ item, index }: { item: HobbyItem, index: number }) => {
    const isSelected = selectedHobbies.includes(item.key);

    return (
      <Animated.View
        entering={FadeInDown.delay(index * 60).springify().damping(14)}
        layout={Layout.springify()}
        style={styles.itemContainer}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => toggleHobby(item.key)}
          style={[
            styles.card,
            { 
              borderColor: isSelected ? theme.colors.primary : 'transparent',
              borderWidth: 2,
              elevation: isSelected ? 4 : 1,
              backgroundColor: theme.colors.surface,
            }
          ]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
            {isSelected && (
              <View style={[
                styles.selectedOverlay, 
                { backgroundColor: theme.colors.primary + '40' }
              ]}>
                <View style={[
                  styles.checkIcon, 
                  { backgroundColor: theme.colors.primary }
                ]}>
                  <IconButton icon="check" iconColor="white" size={14} />
                </View>
              </View>
            )}
          </View>

          <View style={styles.textContainer}>
            <Text 
              variant="labelMedium" 
              style={[
                styles.itemText, 
                { 
                  fontWeight: isSelected ? 'bold' : '500',
                  color: isSelected ? theme.colors.primary : theme.colors.onSurface
                }
              ]}
              numberOfLines={1}
            >
              {item.translatedName}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* HEADER */}
      <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
        <View style={styles.headerTop}>
          <Text variant="headlineMedium" style={styles.title}>
            {isEditMode 
              ? t('views.userHobbies.edit_title') 
              : t('views.userHobbies.title')}
          </Text>
          
          {isEditMode && (
            <IconButton 
              icon="close" 
              size={24} 
              onPress={() => router.back()} 
              style={styles.closeButton}
            />
          )}
        </View>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary, marginBottom: 16 }}>
          {t('views.userHobbies.subtitle')}
        </Text>

        {/* SEARCH BAR */}
        <Searchbar
          placeholder={t('common.search')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor={theme.colors.secondary}
          placeholderTextColor={theme.colors.secondary}
          elevation={0}
        />
      </Animated.View>

      {/* HOBBY LIST */}
      <Animated.FlatList
        data={filteredHobbies}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: theme.colors.secondary }}>
              {t('common.noResults')}
            </Text>
          </View>
        }
      />

      {/* FOOTER */}
      <Surface style={styles.footer} elevation={4}>
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={selectedHobbies.length === 0}
          style={styles.mainButton}
          contentStyle={{ height: 48 }}
        >
          {isEditMode ? t('common.save') : t('common.continue')}
        </Button>

        {!isEditMode && (
          <Button 
            mode="text" 
            onPress={handleSkip}
            style={{ marginTop: 8 }}
            textColor={theme.colors.secondary}
          >
            {t('common.skip')}
          </Button>
        )}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10, 
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    margin: 0,
  },
  searchBar: {
    backgroundColor: 'rgba(0,0,0,0.05)', 
    borderRadius: 12,
    height: 48,
  },
  searchInput: {
    minHeight: 0, 
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 150,
    paddingTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginBottom: 12,
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    flex: 0.75,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  itemText: {
    textAlign: 'center',
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white',
  },
  mainButton: {
    borderRadius: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  }
});