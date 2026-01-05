import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper'; // Dodano import
import { useStore } from 'tinybase/ui-react';
import i18n from '../utils/i18n';

// Import Components
import GoalPicker from '../components/GoalPicker';
import LanguagePicker from '../components/LanguagePicker';

// Local constants
const TABLE_LANGUAGE_PAIRS = 'languagePairs';

// State Types
interface LanguagePairFormData {
  leadingLanguageIso: string | null;
  taughtLanguageIso: string | null;
  goal: string | null;
}

// Props definition
interface AddLanguagePairScreenProps {
  onSuccess: () => void; // Callback po pomyślnym zapisie
  onCancel?: () => void; // Opcjonalny callback dla przycisku "Wróć" / "Zamknij"
}

const steps = {
  leadingLang: 1,
  taughtLang: 2,
  goal: 3,
};

export const AddLanguagePairScreen: React.FC<AddLanguagePairScreenProps> = ({ onSuccess, onCancel }) => {
  const router = useRouter();
  const store = useStore(); 
  const [step, setStep] = useState(steps.leadingLang);
  
  const [formData, setFormData] = useState<LanguagePairFormData>({
    leadingLanguageIso: null,
    taughtLanguageIso: null,
    goal: null,
  });

  const updateData = (key: keyof LanguagePairFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === steps.leadingLang && formData.leadingLanguageIso) {
      setStep(steps.taughtLang);
    } else if (step === steps.taughtLang && formData.taughtLanguageIso) {
      setStep(steps.goal);
    }
  };

  const handleBack = () => {
    if (step > steps.leadingLang) {
      setStep((prev) => prev - 1);
    } else {
      handleCancel();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const saveAndFinish = useCallback(() => {
    try {
      // 1. Walidacja
      if (!formData.leadingLanguageIso || !formData.taughtLanguageIso || !formData.goal) {
        Alert.alert(
          i18n.t('common.error'), 
          i18n.t('add_pair.validation_error')
        );
        return;
      }

      if (!store) {
        console.error('[AddLanguagePair] Store context is missing');
        Alert.alert(
          i18n.t('common.error'), 
          i18n.t('common.database_error')
        );
        return;
      }

      // 2. Generowanie ID
      const newPairId = Crypto.randomUUID();

      // 3. Zapis do TinyBase
      store.setRow(TABLE_LANGUAGE_PAIRS, newPairId, {
        leadingLanguageIso: formData.leadingLanguageIso,
        taughtLanguageIso: formData.taughtLanguageIso,
        goal: formData.goal,
      });

      console.log(`[Persistence] Language pair created: ${newPairId} in table ${TABLE_LANGUAGE_PAIRS}`);

      // 4. Sukces
      onSuccess();

    } catch (error) {
      console.error('[AddLanguagePair] Save error:', error);
      Alert.alert(
        i18n.t('common.error'), 
        i18n.t('add_pair.save_error')
      );
    }
  }, [formData, onSuccess, store]);

  // --- Render Steps ---

  const renderStep = () => {
    switch (step) {
      case steps.leadingLang:
        return (
          <LanguagePicker
            title={i18n.t('add_pair.leading_title', { defaultValue: 'Język bazowy' })}
            subtitle={i18n.t('add_pair.leading_subtitle', { defaultValue: 'Wybierz język, który znasz najlepiej.' })}
            selectedIso={formData.leadingLanguageIso}
            onSelect={(iso) => updateData('leadingLanguageIso', iso)}
            onNext={handleNext}
            isBackAble={false} // Wyłączamy przycisk "Wróć" na dole w 1. kroku, bo mamy X u góry
            onBack={handleBack}
          />
        );

      case steps.taughtLang:
        return (
          <LanguagePicker
            title={i18n.t('add_pair.taught_title', { defaultValue: 'Czego chcesz się nauczyć?' })}
            subtitle={i18n.t('add_pair.taught_subtitle', { defaultValue: 'Wybierz język docelowy.' })}
            selectedIso={formData.taughtLanguageIso}
            onSelect={(iso) => updateData('taughtLanguageIso', iso)}
            onNext={handleNext}
            isBackAble={true}
            onBack={handleBack}
            languageSkipped={formData.leadingLanguageIso || undefined}
          />
        );

      case steps.goal:
        return (
          <GoalPicker
            title={i18n.t('add_pair.goal_title', { defaultValue: 'Jaki jest Twój cel?' })}
            subtitle={i18n.t('add_pair.goal_subtitle', { defaultValue: 'Dostosujemy materiał do Twoich potrzeb.' })}
            selectedGoalId={formData.goal}
            onSelect={(id) => updateData('goal', id)}
            onNext={saveAndFinish}
            onBack={handleBack}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header z przyciskiem Zamknij (X) - widoczny tylko gdy przekazano onCancel */}
      {onCancel && (
        <View style={styles.header}>
          <IconButton
            icon="close"
            size={24}
            onPress={handleCancel}
            style={styles.closeButton}
          />
        </View>
      )}

      <View style={styles.content}>
        {/* Pasek postępu */}
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${(step / 3) * 100}%` }
            ]} 
          />
        </View>

        {renderStep()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Ikona po prawej stronie (standard dla modali)
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
  closeButton: {
    margin: 0,
  },
  content: {
    flex: 1,
  },
  progressBarContainer: {
    height: 4,
    width: '100%',
    backgroundColor: '#f3f4f6', // gray-100
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563EB', // blue-600
    borderRadius: 2,
  },
});

export default AddLanguagePairScreen;