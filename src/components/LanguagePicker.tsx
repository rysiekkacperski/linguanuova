import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, IconButton, Searchbar, Surface, Text, useTheme } from 'react-native-paper';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Language, LanguageIso } from '../../interfaces/language';
import languagesData from '../assets/data/languages.json';
import i18n from '../utils/i18n';

interface LanguagePickerProps {
  title: string;
  subtitle?: string;
  selectedIso: LanguageIso | null;
  onSelect: (iso: LanguageIso) => void;
  onNext: () => void;
  isBackAble?: boolean; // Właściwość sterująca przyciskiem wstecz
  onBack?: () => void;
  languageSkipped?: string; // Kod ISO do odfiltrowania
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  title,
  subtitle,
  selectedIso,
  onSelect,
  onNext,
  isBackAble = false,
  onBack,
  languageSkipped,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  let languageData = languagesData.languages as Language[];

  const languageList = useMemo(() => {
    let list = languageData.map(lang => {
        let translatedName = i18n.t(`languagesNames.${lang.iso}`);
        return { ...lang, name: translatedName };
    });

    if (languageSkipped) {
      list = list.filter((lang) => lang.iso !== languageSkipped);
    }
    
    return list;
  }, [languageSkipped]);

  const filteredLanguages = useMemo(() => {
    let list = languageList
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      list = list.filter(
        (lang) => lang.name.toLowerCase().includes(lowerQuery) 
      );
    }

    return list;
  }, [searchQuery, languageSkipped]);

  const renderItem = ({ item, index }: { item: Language; index: number }) => {
    const isSelected = selectedIso === item.iso;
    const animationDelay = index * 50;

    return (
      <Animated.View
        entering={FadeInDown.delay(animationDelay).springify()}
        layout={Layout.springify()}
        style={styles.itemWrapper}
      >
        <Surface
          style={[
            styles.itemSurface,
            {
              backgroundColor: isSelected ? 
                theme.colors.primaryContainer : theme.colors.surface,
              borderWidth: isSelected ? 2 : 0,
              borderColor: theme.colors.primary,
            }
          ]}
          elevation={1}
        >
          <TouchableOpacity
            onPress={() => onSelect(item.iso)}
            activeOpacity={0.7}
            style={styles.itemTouchable}
          >
            {/* Flaga / Obrazek */}
            <View style={styles.flagContainer}>
                {item.flagUrl ? (
                    <Image 
                      source={{ uri: item.flagUrl }} 
                      style={styles.flagImage}
                      resizeMode="cover"
                    />
                ) : (
                    <Text style={styles.flagFallbackText}>
                      {item.iso.toUpperCase()}
                    </Text>
                )}
            </View>

            {/* Tekst */}
            <View style={styles.textContainer}>
              <Text variant="titleMedium" style={{ 
                fontWeight: 'bold', 
                color: theme.colors.onSurface 
              }}>
                {item.name}
              </Text>
              {item.label && (
                <Text variant="bodySmall" style={{ 
                  color: theme.colors.onSurfaceVariant 
                }}>
                  {item.label}
                </Text>
              )}
            </View>

            {/* Checkmark */}
            {isSelected && (
              <IconButton 
                icon="check-circle" 
                iconColor={theme.colors.primary} 
                size={24} 
              />
            )}
          </TouchableOpacity>
        </Surface>
      </Animated.View>
    );
  };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="bodyLarge" style={styles.headerSubtitle}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Search Bar */}
        <Searchbar
          placeholder={i18n.t('common.search')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
          inputStyle={styles.searchBarInput}
        />

        {/* Lista Języków */}
        <FlatList
          data={filteredLanguages}
          renderItem={renderItem}
          keyExtractor={(item) => item.iso}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text variant="bodyMedium" style={styles.emptyStateText}>
                {i18n.t('common.noResults')}
              </Text>
            </View>
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </View>

      {/* Footer / Buttons Area */}
      <Surface 
        style={[
            styles.footer, 
            { paddingBottom: Platform.OS === 'ios' ? 40 : 20 }
        ]}
        elevation={4}
      >
        <View style={styles.buttonRow}>
          {isBackAble && (
            <Button
              mode="outlined"
              onPress={onBack}
              style={[
                styles.button, 
                styles.backButton, 
                { borderColor: theme.colors.outline }
              ]}
              contentStyle={styles.buttonContent}
            >
              {i18n.t('common.back')}
            </Button>
          )}
          
          <Button
            mode="contained"
            onPress={onNext}
            disabled={!selectedIso}
            style={[
                styles.button, 
                styles.nextButton,
                !selectedIso && { opacity: 0.6 }
            ]}
            contentStyle={[
              styles.buttonContent, 
              { flexDirection: 'row-reverse' }
            ]}
            icon="arrow-right"
          >
            {i18n.t('common.next')}
          </Button>
        </View>
      </Surface>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  headerSubtitle: {
    marginTop: 8,
    color: '#6b7280', // gray-500
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: '#f9fafb', // gray-50
    borderWidth: 1,
    borderColor: '#e5e7eb', // gray-200
    borderRadius: 12,
  },
  searchBarInput: {
    minHeight: 0,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: '#9ca3af', // gray-400
  },
  itemWrapper: {
    marginBottom: 12,
  },
  itemSurface: {
    borderRadius: 12,
  },
  itemTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  flagContainer: {
    width: 48,
    height: 48,
    borderRadius: 9999, // full
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#f3f4f6', // gray-100
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb', // gray-200
  },
  flagImage: {
    width: '100%',
    height: '100%',
  },
  flagFallbackText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6', // gray-100
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    height: 50,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});

export default LanguagePicker;