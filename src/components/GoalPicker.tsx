import { Goal } from '@/interfaces/goal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import goalsData from '../assets/data/goals.json';
import i18n from '../utils/i18n';

interface GoalPickerProps {
  title?: string;
  subtitle?: string;
  selectedGoalId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GoalPicker: React.FC<GoalPickerProps> = ({
  title = i18n.t('views.userGoals.title'),
  subtitle = i18n.t('views.userGoals.subtitle'),
  selectedGoalId,
  onSelect,
  onNext,
  onBack,
}) => {
  const theme = useTheme();
  let goalData = goalsData as Goal[];

  const goalsList = useMemo(() => {
    let list = goalData.map(goal => {
        let translatedName = i18n.t(`views.goals.${goal.id}.name`);
        let translatedDescription = i18n.t(`views.goals.${goal.id}.description`);
        return { ...goal, name: translatedName, description: translatedDescription};
    });
    
    return list;
  }, [goalData]);

  const renderItem = ({ item, index }: { item: Goal; index: number }) => {
    const isSelected = selectedGoalId === item.id;
  
    const animationDelay = index * 100;

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
              backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface,
              borderWidth: isSelected ? 2 : 1, // Subtelna ramka zawsze, grubsza przy wyborze
              borderColor: isSelected ? theme.colors.primary : theme.colors.outlineVariant,
            }
          ]}
          elevation={isSelected ? 2 : 0}
        >
          <TouchableOpacity
            onPress={() => onSelect(item.id)}
            activeOpacity={0.7}
            style={styles.itemTouchable}
          >
            {/* Ikona w kontenerze */}
            <View 
              style={[
                styles.iconContainer,
                { backgroundColor: isSelected ? '#ffffff' : '#f3f4f6' } // white vs gray-100
              ]}
            >
              <MaterialCommunityIcons 
                name={item.iconName} 
                size={28} 
                color={isSelected ? theme.colors.primary : theme.colors.secondary} 
              />
            </View>

            {/* Teksty */}
            <View style={styles.textContainer}>
              <Text 
                variant="titleMedium" 
                style={{ 
                  fontWeight: 'bold', 
                  color: isSelected ? theme.colors.onPrimaryContainer : theme.colors.onSurface,
                  marginBottom: 4
                }}
              >
                {item.name}
              </Text>
              <Text 
                variant="bodySmall" 
                style={{ 
                  color: theme.colors.onSurfaceVariant,
                  lineHeight: 18
                }}
              >
                {item.description}
              </Text>
            </View>

            {/* Checkmark (opcjonalny, tutaj subtelniejszy niż w językach) */}
            {isSelected && (
              <View style={styles.checkMarkContainer}>
                 <MaterialCommunityIcons 
                    name="check-circle" 
                    size={24} 
                    color={theme.colors.primary} 
                 />
              </View>
            )}
          </TouchableOpacity>
        </Surface>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
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

        {/* Lista Celów */}
        <FlatList
          data={goalsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          // Optymalizacja nie jest tu krytyczna przy 5 elementach, ale dobre nawyki zostają
          initialNumToRender={6}
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
          <Button
            mode="outlined"
            onPress={onBack}
            style={[styles.button, styles.backButton, { borderColor: theme.colors.outline }]}
            contentStyle={styles.buttonContent}
          >
            {i18n.t('common.back')}
          </Button>
          
          <Button
            mode="contained"
            onPress={onNext}
            disabled={!selectedGoalId}
            style={[
                styles.button,
                styles.nextButton,
                !selectedGoalId && { opacity: 0.6 }
            ]}
            contentStyle={[styles.buttonContent, { flexDirection: 'row-reverse' }]}
            icon="check"
          >
            {i18n.t('common.next')}
          </Button>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16, // px-4
    paddingTop: 24, // pt-6
  },
  header: {
    marginBottom: 24, // mb-6
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#111827', // gray-900
  },
  headerSubtitle: {
    marginTop: 8,
    color: '#6b7280', // gray-500
  },
  listContent: {
    paddingBottom: 100,
  },
  itemWrapper: {
    marginBottom: 12, // mb-3
  },
  itemSurface: {
    borderRadius: 16,
  },
  itemTouchable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20, // p-5
  },
  iconContainer: {
    padding: 12, // p-3
    borderRadius: 12, // rounded-xl
    marginRight: 16, // mr-4
    // Cień dla ikony
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  checkMarkContainer: {
    marginLeft: 8, // ml-2
    marginTop: 4, // mt-1
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

export default GoalPicker;