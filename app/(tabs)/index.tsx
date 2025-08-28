import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Definições de tipos para as orações e mistérios
interface Prayer {
  name: string;
  text: string;
}

interface Mystery {
  title: string;
  fruit: string;
}

interface MysterySet {
  name: string;
  mysteries: Mystery[];
}

// Dados das orações
const prayers: { [key: string]: Prayer } = {
  signOfCross: { name: "Sinal da Cruz", text: "Pelo Sinal da Santa Cruz, livrai-nos, Deus, Nosso Senhor, dos nossos inimigos. Em nome do Pai, do Filho e do Espírito Santo. Amém." },
  offering1: { name: "Oferecimento 1/2", text: "Divino Jesus, eu vos ofereço este terço que vou rezar, contemplando os mistérios de nossa Redenção. Concedei-me, pela intercessão de Maria vossa Mãe Santíssima, a quem me dirijo, as graças necessárias para bem rezá-lo para ganhar as indulgências desta santa devoção." },
  offering2: { name: "Oferecimento 2/2", text: "(Pode-se o que segue, e também intenções particulares: Ofereço-vos também em reparação aos Corações de Jesus e Maria, nas intenções do Imaculado Coração de Maria, nas intenções do Santo Padre, pelo Santo Padre e por toda a Igreja, pela santificação do clero e das famílias, pelas vocações sacerdotais, religiosas, missionárias e leigas, pela Paz no mundo, pelo Brasil)." },
  apostlesCreed1: { name: "Creio 1/2", text: "Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra, e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado, desceu à mansão dos mortos, ressuscitou ao terceiro dia, subiu aos céus, está sentado à direita de Deus Pai Todo-Poderoso, de onde há de vir a julgar os vivos e os mortos." },
  apostlesCreed2: { name: "Creio 2/2", text: "Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém." },
  ourFather: { name: "Pai Nosso", text: "Pai Nosso, que estais no céu, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém." },
  hailMary: { name: "Ave Maria", text: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém." },
  gloryBe: { name: "Glória ao Pai", text: "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém." },
  oMyJesus: { name: "Ó Meu Jesus", text: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente, as que mais precisarem. Abençoai o Santo Padre e aumentai a nossa fé, convertei os pecadores e dai-nos a paz e os dons do Espírito Santo. Amém." },
  hailHolyQueen1: { name: "Salve Rainha1", text: "Infinitas graças vos damos, soberana Rainha, pelos benefícios que recebemos todos os dias de vossas mãos liberais, diginai-vos agora e para sempre tomar-nos debaixo de vosso poderoso amparo, e para mais vos alegrar vos saudamos com uma Salve-Rainha." },
  hailHolyQueen2: { name: "Salve Rainha2", text: "Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei;" },
  hailHolyQueen3: { name: "Salve Rainha3", text: "e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém. Rogai por nós Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém." },  
};

// Dados dos mistérios
const joyfulMysteries: MysterySet = {
  name: "Mistérios Gozosos",
  mysteries: [
    { title: "1º Mistério Gozoso: A Anunciação do Anjo a Nossa Senhora", fruit: "Humildade" },
    { title: "2º Mistério Gozoso: A Visitação de Nossa Senhora a Santa Isabel", fruit: "Caridade Fraterna" },
    { title: "3º Mistério Gozoso: O Nascimento de Jesus", fruit: "Pobreza de Espírito" },
    { title: "4º Mistério Gozoso: A Apresentação de Jesus no Templo", fruit: "Pureza e Obediência" },
    { title: "5º Mistério Gozoso: O Encontro de Jesus no Templo", fruit: "Busca de Deus" },
  ],
};

const luminousMysteries: MysterySet = {
  name: "Mistérios Luminosos",
  mysteries: [
    { title: "1º Mistério Luminoso: O Batismo de Jesus no Jordão", fruit: "Graça do Batismo" },
    { title: "2º Mistério Luminoso: A Auto-revelação de Jesus nas Bodas de Caná", fruit: "Confiança em Maria" },
    { title: "3º Mistério Luminoso: O Anúncio do Reino de Deus e o Convite à Conversão", fruit: "Conversão" },
    { title: "4º Mistério Luminoso: A Transfiguração de Jesus", fruit: "Desejo de Santidade" },
    { title: "5º Mistério Luminoso: A Instituição da Eucaristia", fruit: "Amor à Eucaristia" },
  ],
};

const sorrowfulMysteries: MysterySet = {
  name: "Mistérios Dolorosos",
  mysteries: [
    { title: "1º Mistério Doloroso: A Agonia de Jesus no Horto das Oliveiras", fruit: "Contrição dos Pecados" },
    { title: "2º Mistério Doloroso: A Flagelação de Jesus", fruit: "Mortificação" },
    { title: "3º Mistério Doloroso: A Coroação de Espinhos", fruit: "Paciência nas Adversidades" },
    { title: "4º Mistério Doloroso: Jesus Carrega a Cruz para o Calvário", fruit: "Aceitação da Cruz" },
    { title: "5º Mistério Doloroso: A Crucifixão e Morte de Jesus", fruit: "Perdão" },
  ],
};

const gloriousMysteries: MysterySet = {
  name: "Mistérios Gloriosos",
  mysteries: [
    { title: "1º Mistério Glorioso: A Ressurreição de Jesus", fruit: "Fé" },
    { title: "2º Mistério Glorioso: A Ascensão de Jesus ao Céu", fruit: "Esperança" },
    { title: "3º Mistério Glorioso: A Descida do Espírito Santo sobre os Apóstolos", fruit: "Amor e Sabedoria" },
    { title: "4º Mistério Glorioso: A Assunção de Nossa Senhora ao Céu", fruit: "Devoção a Maria" },
    { title: "5º Mistério Glorioso: A Coroação de Nossa Senhora como Rainha do Céu e da Terra", fruit: "Perseverança Final" },
  ],
};

// Função para determinar os mistérios do dia com base no dia da semana
const getMysteriesForDay = (): MysterySet => {
  const dayOfWeek = new Date().getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

  switch (dayOfWeek) {
    case 0: // Domingo
    case 3: // Quarta-feira
      return gloriousMysteries;
    case 1: // Segunda-feira
    case 6: // Sábado
      return joyfulMysteries;
    case 2: // Terça-feira
    case 5: // Sexta-feira
      return sorrowfulMysteries;
    case 4: // Quinta-feira
      return luminousMysteries;
    default:
      return joyfulMysteries; // Fallback
  }
};

// Componente principal do aplicativo
const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'rosary' | 'final'>('home');
  const [currentMysteryIndex, setCurrentMysteryIndex] = useState<number>(0);
  const [currentHailMaryCount, setCurrentHailMaryCount] = useState<number>(0); // Contador de Ave-Marias
  const [mysteriesOfTheDay, setMysteriesOfTheDay] = useState<MysterySet | null>(null);
  const [currentPrayerStep, setCurrentPrayerStep] = useState<number>(0); // Índice da oração atual na sequência geral

  useEffect(() => {
    setMysteriesOfTheDay(getMysteriesForDay());
  }, []);

  // Define a sequência de orações para cada dezena
  const decadePrayerSequence = [
    { type: 'mystery_announcement' },
    { type: 'prayer', key: 'ourFather' },
    ...Array(10).fill({ type: 'prayer', key: 'hailMary' }),
    { type: 'prayer', key: 'gloryBe' },
    { type: 'prayer', key: 'oMyJesus' },
  ];

  // Define a sequência de orações iniciais
  const initialPrayerSequence = [
    { type: 'prayer', key: 'signOfCross' },
    { type: 'prayer', key: 'offering1' },
    { type: 'prayer', key: 'offering2' },
    { type: 'prayer', key: 'apostlesCreed1' },
    { type: 'prayer', key: 'apostlesCreed2' },    
    { type: 'prayer', key: 'ourFather' },
    ...Array(3).fill({ type: 'prayer', key: 'hailMary' }), // 3 Ave Marias para Fé, Esperança e Caridade
    { type: 'prayer', key: 'gloryBe' },
    { type: 'prayer', key: 'oMyJesus' },
  ];

  // Define a sequência de orações finais
  const finalPrayerSequence = [
    { type: 'prayer', key: 'hailHolyQueen1' },
    { type: 'prayer', key: 'hailHolyQueen2' },
    { type: 'prayer', key: 'hailHolyQueen3' },
    { type: 'prayer', key: 'signOfCross' },
  ];

  // Função para obter o texto da oração atual
  const getCurrentPrayerText = () => {
    if (!mysteriesOfTheDay) return '';

    // Orações iniciais
    if (currentPrayerStep < initialPrayerSequence.length) {
      const step = initialPrayerSequence[currentPrayerStep];
      return prayers[step.key as keyof typeof prayers].text;
    }

    // Orações das dezenas
    const decadeOffset = currentPrayerStep - initialPrayerSequence.length;
    if (currentMysteryIndex < 5 && decadeOffset < decadePrayerSequence.length * 5) {
      const currentDecadePrayerIndex = decadeOffset % decadePrayerSequence.length;
      const step = decadePrayerSequence[currentDecadePrayerIndex];

      if (step.type === 'mystery_announcement') {
        const mystery = mysteriesOfTheDay.mysteries[currentMysteryIndex];
        return `${mystery.title}\nFruto do Mistério: ${mystery.fruit}`;
      } else {
        return prayers[step.key as keyof typeof prayers].text;
      }
    }

    // Orações finais
    const finalOffset = decadeOffset - (decadePrayerSequence.length * 5);
    if (finalOffset < finalPrayerSequence.length) {
      const step = finalPrayerSequence[finalOffset];
      return prayers[step.key as keyof typeof prayers].text;
    }

    return '';
  };

  // Função para obter o nome da oração atual
  const getCurrentPrayerName = () => {
    if (!mysteriesOfTheDay) return '';

    // Orações iniciais
    if (currentPrayerStep < initialPrayerSequence.length) {
      const step = initialPrayerSequence[currentPrayerStep];
      return prayers[step.key as keyof typeof prayers].name;
    }

    // Orações das dezenas
    const decadeOffset = currentPrayerStep - initialPrayerSequence.length;
    if (currentMysteryIndex < 5 && decadeOffset < decadePrayerSequence.length * 5) {
      const currentDecadePrayerIndex = decadeOffset % decadePrayerSequence.length;
      const step = decadePrayerSequence[currentDecadePrayerIndex];

      if (step.type === 'mystery_announcement') {
        return `Anúncio do ${currentMysteryIndex + 1}º Mistério`;
      } else {
        return prayers[step.key as keyof typeof prayers].name;
      }
    }

    // Orações finais
    const finalOffset = decadeOffset - (decadePrayerSequence.length * 5);
    if (finalOffset < finalPrayerSequence.length) {
      const step = finalPrayerSequence[finalOffset];
      return prayers[step.key as keyof typeof prayers].name;
    }

    return '';
  };

  // Inicia o terço
  const startRosary = () => {
    setCurrentScreen('rosary');
    setCurrentMysteryIndex(0);
    setCurrentHailMaryCount(0);
    setCurrentPrayerStep(0); // Começa com o Sinal da Cruz
  };

  // Avança para a próxima Ave-Maria ou próxima oração na sequência
  const nextPrayer = () => {
    const totalInitialPrayers = initialPrayerSequence.length;
    const totalDecadePrayers = decadePrayerSequence.length;
    const totalFinalPrayers = finalPrayerSequence.length;

    const initialHailMaryStartIndex = initialPrayerSequence.findIndex(p => p.key === 'hailMary');
    const initialHailMaryEndIndex = initialHailMaryStartIndex + 2;

    // Check if current step is within the initial prayers section
    if (currentPrayerStep < totalInitialPrayers) {
      // If it's one of the initial Hail Marys (indices 3, 4, 5)
      if (currentPrayerStep >= initialHailMaryStartIndex && currentPrayerStep <= initialHailMaryEndIndex) {
        setCurrentHailMaryCount(prev => prev + 1); // Increment Hail Mary count
        if (currentPrayerStep === initialHailMaryEndIndex) { // If it's the 3rd Hail Mary
          setCurrentPrayerStep(prev => prev + 1); // Move to the next prayer (Glory Be)
          setCurrentHailMaryCount(0); // Reset Hail Mary count for the next sequence
        } else {
          setCurrentPrayerStep(prev => prev + 1); // Move to the next Hail Mary in the initial set
        }
      } else { // Not a Hail Mary in initial sequence, just move to next prayer
        setCurrentPrayerStep(prev => prev + 1);
        setCurrentHailMaryCount(0); // Reset count just in case
      }
      return;
    };

    // If current step is beyond initial prayers, it's in the decade prayers section
    // Calculate current prayer's index within its specific decade (0-12)
    // This is relative to the start of the current mystery's decade sequence
    const prayerIndexInCurrentDecade = currentPrayerStep - (totalInitialPrayers + currentMysteryIndex * totalDecadePrayers);

    const decadeHailMaryStartIndex = decadePrayerSequence.findIndex(p => p.key === 'hailMary');
    const decadeHailMaryEndIndex = decadeHailMaryStartIndex + 9;

    // If it's one of the 10 Hail Marys in the current decade
    if (prayerIndexInCurrentDecade >= decadeHailMaryStartIndex && prayerIndexInCurrentDecade <= decadeHailMaryEndIndex) {
      setCurrentHailMaryCount(prev => prev + 1); // Increment Hail Mary count
      if (prayerIndexInCurrentDecade === decadeHailMaryEndIndex) { // If it's the 10th Hail Mary
        setCurrentPrayerStep(prev => prev + 1); // Move to the next prayer (Glory Be for the decade)
        setCurrentHailMaryCount(0); // Reset Hail Mary count
      } else {
        setCurrentPrayerStep(prev => prev + 1); // Move to the next Hail Mary in the decade
      }
      return;
    }

    // If it's not a Hail Mary in the current decade, just move to the next prayer
    // This handles Our Father, Mystery Announcement, Glory Be, O My Jesus within a decade
    if (currentMysteryIndex < 5 && prayerIndexInCurrentDecade < totalDecadePrayers - 1) {
      setCurrentPrayerStep(prev => prev + 1);
      setCurrentHailMaryCount(0); // Reset count just in case
      return;
    }

    // If it's the last prayer of a decade (O My Jesus) and not the last mystery
    if (currentMysteryIndex < 4) { // If not yet finished the 5th mystery
      setCurrentMysteryIndex(prev => prev + 1); // Move to the next mystery
      // Calculate the starting prayer step for the next mystery's decade sequence
      setCurrentPrayerStep(totalInitialPrayers + (currentMysteryIndex + 1) * totalDecadePrayers);
      setCurrentHailMaryCount(0); // Reset Hail Mary count
      return;
    }

    // If all 5 mysteries are completed, move to final prayers
    setCurrentScreen('final');
    // Set currentPrayerStep to the beginning of the final prayers sequence
    setCurrentPrayerStep(totalInitialPrayers + (5 * totalDecadePrayers));
    setCurrentHailMaryCount(0); // Reset Hail Mary count
  };

    // Avança para a próxima Ave-Maria ou próxima oração na sequência
  const lastPrayer = () => {
    const totalInitialPrayers = initialPrayerSequence.length;
    const totalDecadePrayers = decadePrayerSequence.length;
    const totalFinalPrayers = finalPrayerSequence.length;

    const initialHailMaryStartIndex = initialPrayerSequence.findIndex(p => p.key === 'hailMary');
    const initialHailMaryEndIndex = initialHailMaryStartIndex + 2;

    // Check if current step is within the initial prayers section
    if (currentPrayerStep < totalInitialPrayers) {
      // If it's one of the initial Hail Marys (indices 3, 4, 5)
      if (currentPrayerStep >= initialHailMaryStartIndex && currentPrayerStep <= initialHailMaryEndIndex) {
        setCurrentHailMaryCount(prev => prev - 1); // Increment Hail Mary count
        if (currentPrayerStep === initialHailMaryEndIndex) { // If it's the 3rd Hail Mary
          setCurrentPrayerStep(prev => prev - 1); // Move to the next prayer (Glory Be)
          setCurrentHailMaryCount(0); // Reset Hail Mary count for the next sequence
        } else {
          setCurrentPrayerStep(prev => prev - 1); // Move to the next Hail Mary in the initial set
        }
      } else { // Not a Hail Mary in initial sequence, just move to next prayer
        setCurrentPrayerStep(prev => prev - 1);
        setCurrentHailMaryCount(0); // Reset count just in case
      }
      return;
    };

    // If current step is beyond initial prayers, it's in the decade prayers section
    // Calculate current prayer's index within its specific decade (0-12)
    // This is relative to the start of the current mystery's decade sequence
    const prayerIndexInCurrentDecade = currentPrayerStep - (totalInitialPrayers + currentMysteryIndex * totalDecadePrayers);

    const decadeHailMaryStartIndex = decadePrayerSequence.findIndex(p => p.key === 'hailMary');
    const decadeHailMaryEndIndex = decadeHailMaryStartIndex + 9;

    // If it's one of the 10 Hail Marys in the current decade
    if (prayerIndexInCurrentDecade >= decadeHailMaryStartIndex && prayerIndexInCurrentDecade <= decadeHailMaryEndIndex) {
      setCurrentHailMaryCount(prev => prev - 1); // Increment Hail Mary count
      if (prayerIndexInCurrentDecade === decadeHailMaryEndIndex) { // If it's the 10th Hail Mary
        setCurrentPrayerStep(prev => prev - 1); // Move to the next prayer (Glory Be for the decade)
        setCurrentHailMaryCount(0); // Reset Hail Mary count
      } else {
        setCurrentPrayerStep(prev => prev - 1); // Move to the next Hail Mary in the decade
      }
      return;
    }

    // If it's not a Hail Mary in the current decade, just move to the next prayer
    // This handles Our Father, Mystery Announcement, Glory Be, O My Jesus within a decade
    if (currentMysteryIndex < 5 && prayerIndexInCurrentDecade < totalDecadePrayers - 1) {
      setCurrentPrayerStep(prev => prev - 1);
      setCurrentHailMaryCount(0); // Reset count just in case
      return;
    }

    // If it's the last prayer of a decade (O My Jesus) and not the last mystery
    if (currentMysteryIndex < 4) { // If not yet finished the 5th mystery
      setCurrentMysteryIndex(prev => prev - 1); // Move to the next mystery
      // Calculate the starting prayer step for the next mystery's decade sequence
      setCurrentPrayerStep(totalInitialPrayers + (currentMysteryIndex + 1) * totalDecadePrayers);
      setCurrentHailMaryCount(0); // Reset Hail Mary count
      return;
    }

    // If all 5 mysteries are completed, move to final prayers
    setCurrentScreen('final');
    // Set currentPrayerStep to the beginning of the final prayers sequence
    setCurrentPrayerStep(totalInitialPrayers + (5 * totalDecadePrayers));
    setCurrentHailMaryCount(0); // Reset Hail Mary count
  };

  // Reinicia o terço
  const resetRosary = () => {
    setCurrentScreen('home');
    setCurrentMysteryIndex(0);
    setCurrentHailMaryCount(0);
    setCurrentPrayerStep(0);
  };

  // Renderiza a tela inicial
  const renderHomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Rezar o Terço Católico</Text>
      <Text style={styles.subtitle}>
        Mistérios do Dia: {mysteriesOfTheDay ? mysteriesOfTheDay.name : 'Carregando...'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={startRosary}>
        <Text style={styles.buttonText}>Rezar o Terço de Hoje</Text>
      </TouchableOpacity>
    </View>
  );

  // Renderiza a tela do terço
  const renderRosaryScreen = () => {
    const totalInitialPrayers = initialPrayerSequence.length;
    const totalDecadePrayers = decadePrayerSequence.length;

    const initialHailMaryStartIndex = initialPrayerSequence.findIndex(p => p.key === 'hailMary');
    const initialHailMaryEndIndex = initialHailMaryStartIndex + 2;

    const decadeHailMaryStartIndex = decadePrayerSequence.findIndex(p => p.key === 'hailMary');
    const decadeHailMaryEndIndex = decadeHailMaryStartIndex + 9;

    // Calculate prayerIndexInCurrentDecade here
    const prayerIndexInCurrentDecade = currentPrayerStep - (totalInitialPrayers + currentMysteryIndex * totalDecadePrayers);

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.rosaryContainer}>
          <Text style={styles.mysteryTitle}>
            {mysteriesOfTheDay?.name}
          </Text>

          {currentPrayerStep >= initialPrayerSequence.length && (
            <Text style={styles.currentMysteryHeader}>
              {`Mistério ${currentMysteryIndex + 1}: ${mysteriesOfTheDay?.mysteries[currentMysteryIndex]?.title || ''}`}
            </Text>
          )}

          <View style={styles.prayerDisplay}>
            <Text style={styles.prayerName}>{getCurrentPrayerName()}</Text>
            <ScrollView style={styles.prayerTextContainer}>
              <Text style={styles.prayerText}>{getCurrentPrayerText()}</Text>
            </ScrollView>
          </View>

          <View style={styles.counterContainer}>
            {currentPrayerStep >= initialHailMaryStartIndex &&
             currentPrayerStep <= initialHailMaryEndIndex &&
             initialPrayerSequence[currentPrayerStep].key === 'hailMary' ? (
              <Text style={styles.counterText}>
                {`Ave-Marias: ${currentHailMaryCount+1} / 3`}
              </Text>
            ) : currentPrayerStep >= totalInitialPrayers &&
               prayerIndexInCurrentDecade >= decadeHailMaryStartIndex &&
               prayerIndexInCurrentDecade <= decadeHailMaryEndIndex &&
               decadePrayerSequence[prayerIndexInCurrentDecade]?.key === 'hailMary' ? (
              <Text style={styles.counterText}>
                {`Ave-Marias: ${currentHailMaryCount+1} / 10`}
              </Text>
            ) : null}
          </View>

          <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.navButton, currentPrayerStep === 0 && styles.navButtonDisabled]}
          onPress={lastPrayer}
          disabled={currentPrayerStep === 0}
        >
          <Text style={styles.buttonText}>Oração Anterior</Text>
        </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={nextPrayer}>
              <Text style={styles.buttonText}>Próxima Oração</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.navButton} onPress={resetRosary}>
              <Text style={styles.buttonText}>Reiniciar Terço</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  // Renderiza a tela final
  const renderFinalScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Terço Concluído!</Text>
      <Text style={styles.subtitle}>
        Você rezou os {mysteriesOfTheDay?.name} de hoje.
      </Text>
      <ScrollView style={styles.prayerTextContainer}>
      <Text style={styles.prayerText}>{prayers.hailHolyQueen1.text}</Text>
      <Text style={styles.prayerText}>{prayers.hailHolyQueen2.text}</Text>
      <Text style={styles.prayerText}>{prayers.hailHolyQueen3.text}</Text>
      <Text style={styles.prayerText}>{prayers.signOfCross.text}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={resetRosary}>
        <Text style={styles.buttonText}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'rosary' && renderRosaryScreen()}
      {currentScreen === 'final' && renderFinalScreen()}
    </>
  );
};

// Estilos do aplicativo
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E0F2F7', // Light blue background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2F7', // Light blue background
    padding: 20,
  },
  rosaryContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E0F2F7',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50', // Dark blue text
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#34495E', // Medium dark blue text
    marginBottom: 30,
    textAlign: 'center',
  },
  mysteryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  currentMysteryHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2980B9', // Blue text
    marginBottom: 15,
    textAlign: 'center',
  },
  prayerDisplay: {
    backgroundColor: '#FFFFFF', // White background for prayer card
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
    width: '95%',
    minHeight: height * 0.3,
    maxHeight: height * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prayerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1ABC9C', // Green text
    marginBottom: 10,
    textAlign: 'center',
  },
  prayerTextContainer: {
    width: '100%',
  },
  prayerText: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
    textAlign: 'center',
  },
  counterContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C', // Red text
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#3498DB', // Blue button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    marginVertical: 10,
  },
  navButton: {
    backgroundColor: '#2ECC71', // Green button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    marginHorizontal: 5,
    flex: 1, // Distribute space evenly
  },
  // NOVO ESTILO PARA O BOTÃO DESABILITADO
  navButtonDisabled: {
    backgroundColor: '#B2C2BF', // Cinza claro
    // Remova a sombra para que pareça "achatado"
    shadowOpacity: 0,
    elevation: 0,
  },  
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App
