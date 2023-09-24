import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';

import 'package:quasar/widgets/universities_screen.dart';
import 'package:quasar/widgets/questions_screen.dart';

void main() {
  LicenseRegistry.addLicense(() async* {
    final license = await rootBundle.loadString('assets/fonts/Roboto_Slab/static/LICENSE.txt');
    yield LicenseEntryWithLineBreaks(['Roboto_Slab'], license);
  });

  runApp(const QuasarApp());
}

class QuasarApp extends StatelessWidget {
  const QuasarApp({super.key});

  @override Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Quasar',
      routes: {
        '/universities': (context) => const UniversitiesScreen(),
        '/questions': (context) => const QuestionsScreen()
      },
      initialRoute: '/universities',
      color: const Color.fromARGB(255, 112, 72, 232)
    );
  }
}
