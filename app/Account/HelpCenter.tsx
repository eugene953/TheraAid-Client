import {
  StyleSheet, Text, View, TextInput, FlatList, Pressable, ActivityIndicator, ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import HeaderHelpCenter from '@/components/Headers/HeaderHelpCenter'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const categories = [
  { id: 1, name: 'Getting Started', icon: 'rocket' },
  { id: 2, name: 'Account & Security', icon: 'lock-closed' },
  { id: 3, name: 'Settings', icon: 'settings' },
  { id: 4, name: 'Orders', icon: 'cube' },
]

const HelpCenter = () => {
  const [query, setQuery] = useState('')
  const [allResults, setAllResults] = useState<any[]>([])
  const [filteredResults, setFilteredResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(1)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
      const data = await res.json()
      setAllResults(data)
      filterByCategory(data, selectedCategory)
    } catch (error) {
      console.error('Fetch failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (text: string) => {
    setQuery(text)
    const lower = text.toLowerCase()
    const filtered = allResults.filter(
      item =>
        item.userId === selectedCategory &&
        (item.title.toLowerCase().includes(lower) ||
          item.body.toLowerCase().includes(lower))
    )
    setFilteredResults(filtered)
  }

  const filterByCategory = (data: any[], categoryId: number) => {
    const filtered = data.filter(item => item.userId === categoryId)
    setFilteredResults(filtered)
  }

  const handleCategoryPress = (id: number) => {
    setSelectedCategory(id)
    setQuery('')
    filterByCategory(allResults, id)
  }

  const renderItem = ({ item }: { item: any }) => (
    <Pressable style={styles.resultItem}>
      <Text style={styles.resultTitle}>{item.title}</Text>
      <Text style={styles.resultDesc}>{item.body}</Text>
    </Pressable>
  )

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderHelpCenter /> }} />
      <View style={styles.container}>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            placeholder="Search help articles..."
            value={query}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* Categories Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => handleCategoryPress(cat.id)}
              style={[
                styles.categoryButton,
                selectedCategory === cat.id && styles.categoryButtonActive
              ]}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat.id && styles.categoryTextActive
              ]}>
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Loader */}
        {loading && <ActivityIndicator size="small" color={Colors.primary} style={{ marginTop: 20 }} />}

        {/* Results */}
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          style={{ marginTop: 10 }}
        />
      </View>
    </>
  )
}

export default HelpCenter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  categoriesContainer: {
    marginTop: 15,
    marginBottom: 10,
    flexGrow: 0,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#EEE',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  resultItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  resultDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
})
