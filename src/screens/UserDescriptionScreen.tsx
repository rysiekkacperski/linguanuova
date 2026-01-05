import { useRouter } from 'expo-router';
import { Check, SkipForward, Sparkles, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from 'tinybase/ui-react';
import i18n from '../utils/i18n';

const MAX_LENGTH = 280;

interface UserDescriptionScreenProps {
  onSuccess: () => void;
  onSkip?: () => void;
  onCancel?: () => void;
}

export default function UserDescriptionScreen ({ 
  onSuccess, 
  onSkip,
  onCancel
}: UserDescriptionScreenProps){
  const theme = useTheme();
  const router = useRouter();
  const store = useStore();
  
  const initialDescription = store?.getValue('userDescription');
  
  const [description, setDescription] = useState(initialDescription ? initialDescription as string : '');
  const [error, setError] = useState<string | null>(null);
  
  const isEditMode = !!initialDescription;
  
  useEffect(() => {
    if (initialDescription) {
      setDescription(initialDescription as string);
    }
  }, [initialDescription]);

  const charsLeft = MAX_LENGTH - description.length;
  const isOverLimit = charsLeft < 0;

  const handleSave = () => {
    if (description.trim() !== initialDescription){
      store?.setValue('userDescription', description.trim());
    }
    onSuccess();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Animated.View 
            entering={FadeInDown.duration(600).springify()} 
            exiting={FadeOutUp.duration(400)}
            style={styles.content}
          >
            
            {/* Header Section */}
            <View style={styles.header}>
              <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                <Sparkles size={32} color={theme.colors.primary} />
              </View>
              
              <Text variant="headlineMedium" style={styles.title}>
                {isEditMode ? 
                  i18n.t('views.userDescription.editTitle') 
                  : i18n.t('views.userDescription.title')
                }
              </Text>
              
              <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.secondary }]}>
                {isEditMode 
                  ? i18n.t('views.userDescription.editSubtitle')
                  : i18n.t('views.userDescription.subtitle')
                }
              </Text>
            </View>

            {/* Input Section */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                multiline
                placeholder={i18n.t('views.userDescription.placeholder')}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  if (error) setError(null);
                }}
                style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
                contentStyle={styles.inputContent}
                outlineColor={isOverLimit ? theme.colors.error : undefined}
                activeOutlineColor={isOverLimit ? theme.colors.error : theme.colors.primary}
                right={<TextInput.Affix text={`${description.length}/${MAX_LENGTH}`} />}
              />
              
              {error && (
                <Animated.Text 
                  entering={FadeInDown} 
                  style={[styles.errorText, { color: theme.colors.error }]}
                >
                  {error}
                </Animated.Text>
              )}
            </View>

            {/* Actions Section */}
            <View style={styles.actions}>
              <Button
                mode="contained"
                onPress={handleSave}
                disabled={!description.trim() || isOverLimit}
                style={styles.button}
                contentStyle={styles.buttonContent}
                icon={({ size, color }) => <Check size={size} color={color} />}
              >
                {isEditMode ? i18n.t('common.save') : i18n.t('common.continue')}
              </Button>

              {!isEditMode ? (
                <Button
                  mode="text"
                  onPress={onSkip}
                  style={styles.skipButton}
                  icon={({ size, color }) => <SkipForward size={size} color={color} />}
                >
                  {i18n.t('common.skip')}
                </Button>
              ) : onCancel ? (
                <Button
                  mode="outlined"
                  onPress={onCancel}
                  style={styles.skipButton}
                  icon={({ size, color }) => <X size={size} color={color} />}
                >
                  {i18n.t('common.cancel')}
                </Button>
              ): <></>}
            </View>

          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 24,
  },
  input: {
    minHeight: 200, 
    textAlignVertical: 'top',
  },
  inputContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  errorText: {
    marginTop: 8,
    fontSize: 12,
  },
  actions: {
    gap: 12,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    height: 56,
  },
  skipButton: {
    borderRadius: 12,
  }
});